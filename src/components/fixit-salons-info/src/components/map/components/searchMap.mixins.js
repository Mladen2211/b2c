import Vue from 'vue';
import { debounce, throttle } from 'lodash-es';
import { Marker } from '../models/GeoLocation';
import SearchMapInfoWindowCard from './SearchMapInfoWindowCard.vue'
import { icons, styles } from './searchMap.config';

export default {
	data: () => ({
		overlayView: null,
		maxZIndex: 0
	}),
    methods: {
        boundsChanged: debounce(function() {
			if (this.map && this.markers && this.locationMarkers.length) {
				const markers = this.getMarkersWithinBounds();

				// Sort by closest to location (performance cap)
				if (markers.length <= 75) {
					markers.sort(
						(a, b) =>
							this.$google.maps.geometry.spherical.computeDistanceBetween(this.locationMarkers[0].marker.position, a.marker.position) -
							this.$google.maps.geometry.spherical.computeDistanceBetween(this.locationMarkers[0].marker.position, b.marker.position)
					);
				}

				this.$emit('bounds-changed', markers);
				this.updateMarkersAvailability();
			}
		}, 1000),

		mapDragged: throttle(function() {
			if (this.map && this.markers && this.locationMarkers.length) {
				this.setMarkersLoadingState();
			}
		}, 500),
		
		/**
		 * Get all markers within provided bounds.
		 * @param {Object} bounds - The Google Maps bounds.
		 */
		getMarkersWithinBounds(bounds = this.map.getBounds()) {
			return bounds ? this.markers.filter(m => bounds.contains(m.marker.position)) : [];
		},

		/**
		 * Gets the closest markers from provided latitude and longitude.
		 * @param {Object} [$props=this.$props] - The properties of the location to calculate closest markers from.
		 * @param {Number} $props.latitude - The latitude of the location.
		 * @param {Number} $props.longitude - The longitude of the location.
		 * @param {Number} [limit=1] - Limits the resulting Array by given `limit`.
		 * @returns {Marker[]} - Array of markers
		 */
		getNearestMarkers({ latitude, longitude } = this.$props, limit = 1) {
			const location = new this.$google.maps.LatLng(latitude, longitude);
			let closest = new Array(limit).fill({ distance: Infinity });

			for (const marker of this.markers) {
				const distance = this.$google.maps.geometry.spherical.computeDistanceBetween(location, marker.marker.position);
				const indexToReplace = closest.findIndex(m => m.distance > distance);
				if (~indexToReplace) {
					closest.splice(indexToReplace, 0, { marker, distance });
					closest = closest.slice(0, limit);
				}
			}

			return closest.filter(c => c.marker).map(c => c.marker);
		},

		/**
		 * Check if there is markers within provided bounds.
		 * @param {Object} bounds - The Google Maps bounds
		 * @param {Number} [minimumNumberOfMarkers=1] - The minimum number of markers that needs to be within bounds.
		 */
		hasMarkersWithinBounds(bounds = this.map.getBounds(), minimumNumberOfMarkers = 1) {
			minimumNumberOfMarkers = Math.min(minimumNumberOfMarkers, this.markers.length);
			let contains = 0;
			for (const marker of this.markers) {
				if (bounds.contains(marker.marker.position)) contains++;
				if (contains >= minimumNumberOfMarkers) break;
			}

			return contains >= minimumNumberOfMarkers;
		},
        
        /**
		 * Load Google Maps script
		 */
		loadGoogleMaps() {
			return new Promise(resolve => {
				this.loading++;
				const gmaps = document.createElement('script');
				gmaps.src = `https://maps.googleapis.com/maps/api/js?key=${this.$google.geoApiKey}&libraries=places,geometry`;
				gmaps.async = true;
				gmaps.defer = true;
				gmaps.onload = () => {
					this.$google.maps = window.google.maps;
					this.loading--;
					resolve();
				};

				document.head.appendChild(gmaps);
			});
		},
		loadOverlappingMakerSpiderfier() {
			return new Promise(resolve => {
				this.loading++;
				const gmaps = document.createElement('script');
				gmaps.src = `https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.min.js`;
				gmaps.async = true;
				gmaps.defer = true;
				gmaps.onload = () => {
					this.$google.oms = window.OverlappingMarkerSpiderfier;
					this.loading--;
					resolve();
				};

				document.head.appendChild(gmaps);
			});
        },
        
        /**
		 * Mount a new Google Maps to the map container. Position the map on current location.
		 */
		mountMap() {
			return new Promise(resolve => {
				this.loading++;
				this.$nextTick(() => {
					// Construct map
					this.map = new this.$google.maps.Map(this.$refs.map, {
						center: new this.$google.maps.LatLng(this.latitude, this.longitude),
						//scrollwheel: !this.$vuetify.breakpoint.smAndDown,
						mapTypeControl: false,
						minZoom: 5,
						maxZoom: 18,
						gestureHandling: this.$vuetify.breakpoint.smAndDown ? 'auto' : 'greedy',
						fullscreenControl: false,
						streetViewControl: false,
						disableDefaultUI: false,
						restriction: {
							// Set Norway as restricted bounds
							latLngBounds: new this.$google.maps.LatLngBounds(new this.$google.maps.LatLng(57.492214, 2.498016), new this.$google.maps.LatLng(71.594412, 33.523407))
						},
						mapTypeId: this.$google.maps.MapTypeId.ROADMAP,
						styles
					});

					this.$nextTick(() => {
						// Listener for map bounds changes
						this.$google.maps.event.addListener(this.map, 'idle', this.boundsChanged);

						// Listener for map drag event
						this.$google.maps.event.addListener(this.map, 'drag', this.mapDragged);

						// Overlay view for animated markers
						this.overlayView = new this.$google.maps.OverlayView();
						this.overlayView.draw = function() {
							this.getPanes().markerLayer.id = 'OverlayView';
						};
						this.overlayView.setMap(this.map);
					});

					this.loading--;
					resolve();
				});
			});
        },
		
        /**
         * (Re-)Mount markers on the map.
         * @param {Object} [$props=this.$props] - Current props/filter to fetch and render markers for.
         */
        mountMarkers({ category, treatment, datetime, timeSlotStart, timeSlotEnd, searchtype, search } = this.$props) {
			return new Promise(async resolve => {
				this.loading++;
				this.$nextTick(async () => {					
					// 1. Fetch new markers
					let markers = await this.$store.dispatch('search/getMarkersForSites')


					if (category || treatment) {
						markers = markers.filter(m => treatment ? m.availableTreatments.includes(treatment) : m.availableCategories.includes(category));
					}

					// Handling global search (fast search by typing and press enter without selecting a suggestion)
					if(searchtype == 'global'){
						const visibleMarkers = await this.$store.dispatch('search/getLocations', search);

						const searchResultMarkers = visibleMarkers.filter(m=>m.type == 'salon').map(marker => {
							return marker.siteId;
						});
						markers = markers.filter(m=> searchResultMarkers.includes(m.siteId));
					}

					var infowindow = new this.$google.maps.InfoWindow({
						content: `<div></div>`
					});

					// Click on the map should close the infoWindow.
					// We only need one infowindow, and not 1 per marker.
					// This way it will be reused and relocated.
					this.$google.maps.event.addListener(this.map, "click", function() {
						infowindow.close();
					});

					// 2. Reset current markers
					for (const marker of this.markers) {
						marker.marker.setMap(null);
						this.markers = [];
					}
					const google = this.$google;
					this.oms = new google.oms(this.map, { 
						markersWontMove: true,
						basicFormatEvents: true
					 });
					const mapSize = google.maps.Size;
					// this.oms.addListener('format', function(marker, status) {
						
					// TODO: Add custom icon for pins overlapping (plus sign)
					// 	var iconURL = icons.SALON_PIN;
					// 	switch(status){
					// 		case google.oms.markerStatus.SPIDERFIED: 
					// 			iconURL = icons.SALON_PIN_HIGHLIGHTED;
					// 			break;
					// 		case google.oms.markerStatus.SPIDERFIABLE: 
					// 			iconURL = icons.SALON_PIN_MULTIPLE_SITES;
					// 			break;
					// 		case google.oms.markerStatus.UNSPIDERFIED: 
					// 			iconURL = icons.SALON_PIN_MULTIPLE_SITES;
					// 			break;
					// 		case google.oms.markerStatus.UNSPIDERFIABLE: 
					// 			iconURL = icons.SALON_PIN;
					// 			break;
					// 	}
					// 	var iconSize = new mapSize(26, 26);
					// 	marker.setIcon({
					// 	  url: iconURL,
					// 	  scaledSize: iconSize  // makes SVG icons work in IE
					// 	});
					//   });

					// 3. Mount new markers
					requestAnimationFrame(() => {
						this.markers = markers.map(salon =>
							{
								let m = new Marker({
									...salon,
									marker: new this.$google.maps.Marker({
										title: salon.name,
										position: new this.$google.maps.LatLng(salon.latitude, salon.longitude),
										icon: datetime ? icons.SALON_UNAVAILABLE_PIN : icons.SALON_PIN,
										map: this.map
									})
								})
								
								const onShowSalonPopup = () => {
									const ComponentClass = Vue.extend(SearchMapInfoWindowCard)
									const isMobile = this.$vuetify.breakpoint.smAndDown;
									var instance = new ComponentClass({
										propsData: { salon, treatment, category, datetime, isMobile },
										store: this.$store,
										
									})
									instance.$slots.default = [ 'Bestill time' ]
									instance.$mount()
									infowindow.setContent(instance.$el);
									infowindow.open(this.map, m.marker);
								}
								
								// Click listner for infowindow
								//oms.addListener('click', onShowSalonPopup);
								//this.$google.maps.event.addListener(m.marker, 'click', onShowSalonPopup);
								
								this.oms.addMarker(m.marker, onShowSalonPopup);

								return m;
							}
						);
						
						this.$nextTick(() => { this.updateMarkersAvailability() })
						this.loading--;
						resolve();
					});
				});
			});
		},

		setMarkersLoadingState(markers = this.getMarkersWithinBounds().filter(m => !m.__availabilityFetched)) {
			if (this.datetime) {
				for (const marker of markers) {
					marker.marker.setOptions({
						optimized: false
					});
				}
			}
		},

		highlightMarker(siteId, shouldHighlight){

			const markers = this.getMarkersWithinBounds();
			if(!this.maxZIndex){
				this.maxZIndex = markers.length + 3;
			}else{
				this.maxZIndex++;
			}

			// reset location and search pin/marker
			for(const locationMarker of this.locationMarkers){
				locationMarker.marker.setOptions({
					zIndex: 1
				});
			}

			// Highlight/unhighlight a marker
			for (const marker of markers) {
				if(siteId == marker.siteId){
					if(shouldHighlight){
						marker.marker.setOptions({
							zIndex: this.maxZIndex,
							icon: icons.SALON_PIN_HIGHLIGHTED
						});
						this.maxZIndex++;
					}else{
						marker.marker.setOptions({
							icon: marker.available ? icons.SALON_PIN : icons.SALON_UNAVAILABLE_PIN,
						});
					}
				}
			}
		},

		async updateMarkersAvailability({ /* category, */ treatment, datetime, timeSlotStart, timeSlotEnd } = this.$props) {
			const markers = this.getMarkersWithinBounds().filter(m => !m.__availabilityFetched);
			this.setMarkersLoadingState(markers);
			
			// Update markers availability + reset loading state
			const availability = new Map((datetime ? await this.$store.dispatch('search/getAvailableTimeForSites', { siteIds: markers.map(m => m.siteId), date: new Date(datetime), treatmentId: treatment }) : []).map(a => [a.siteId, a]));
			for (const [index, marker] of markers.entries()) {
				marker.__availabilityFetched = true;
				const availabilityItem = availability.get(marker.siteId);

				// Find available time based on time (from-to) on a given date
				const availableTimeString = availabilityItem?.availableTimeString || "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
				const startIndex = timeSlotStart/15;
				const endIndex = timeSlotEnd/15;
				const selectedTimeString = availableTimeString.substring(startIndex, endIndex);
				const count = (selectedTimeString.match(/1/g) || []).length;
				
				// Check available time on the date and time
				marker.available = [true, undefined].includes(availabilityItem?.available) && count;
				
				// Update markers to the availability status
				marker.marker.setOptions({
					icon: marker.available ? icons.SALON_PIN : icons.SALON_UNAVAILABLE_PIN,
					zIndex: marker.available ? index : -index,
					optimized: true
				});
			}
		}
	},
	watch: {
		$props: {
			deep: true,
			handler(props) {
				this.$nextTick(async () => {
					if (!this.$google.maps) await this.loadGoogleMaps();
					if (!this.$google.oms) await this.loadOverlappingMakerSpiderfier();
					if (!this.map) await this.mountMap();
					
					// Triggered by the search result list on hover/highlight
					// this.$eventBus.$on('search.map.highlight.marker', this.highlightMarker);
					// this.$eventBus.$on('search.map.unhighlight.marker', this.highlightMarker);

					// Notify about prop changes
					const changedProps = this.__previousProps ? Object.keys(props).filter(key => props[key] !== this.__previousProps[key]) : Object.keys(Object(props));
					if (changedProps.some(p => ['category', 'treatment', 'datetime', 'timeSlotStart', 'timeSlotEnd'].includes(p))) {
						// Only need to (re-)mount markers when either category, treatment or datetime filter is changed.
						await this.mountMarkers();
					}
					
					// Handle global search change
					// if(changedProps.includes('searchtype') || changedProps.includes('search')){
					// 	await this.mountMarkers();
					// }
					// await this.propsChanged(props, changedProps);

					// Update previous props reference.
					this.__previousProps = { ...props };
				});
			},
			immediate: true
		}
	}
}