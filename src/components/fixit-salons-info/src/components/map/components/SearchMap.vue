<template>
  <div class="search-map">
    <div ref="map" style="heigth: 500px" :class="{ 'search-map': true, fullscreen: false }"></div>
    <div
      class="map-fullscreen"
      id="fullscreen-button"
      @click="enableFullScreenMap"
      v-if="(isMounted && $vuetify.breakpoint.smAndDown) || mapIsFullscreen"
    >
      <v-btn id="toggle-button" class="btn-fullscreen-toggle" small>
        <v-icon>{{
          mapIsFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }}</v-icon>
      </v-btn>
    </div>
    <v-skeleton-loader
      class="search-map__loader"
      type="image"
      height="100%"
      width="100%"
      v-show="!!loading"
    />
  </div>
</template>

<script>
import { Marker } from "../models/GeoLocation";
import { styles } from "./searchMap.config";
import SearchMapInfoWindowCard from './SearchMapInfoWindowCard.vue'
import { MarkerClusterer, GridAlgorithm  } from "@googlemaps/markerclusterer";
export default {
  name: "search-map",
  props: {
    salons: {
      type: Array,
      required: true,
      default: []
    },
    zoom: {
      type: Number,
      required: false,
      default: 15
    },
    panToIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  mixins: [
    // searchMapMixins,
    // searchLocationMixins
  ],
  components: {},
  // props: {
  // 	search: String,
  // 	searchtype: String,
  // 	category: Number,
  // 	treatment: Number,
  // 	datetime: String,
  // 	timeSlotStart: Number,
  // 	timeSlotEnd: Number,
  // 	latitude: Number,
  // 	longitude: Number,
  // 	placeid: String
  // },
  data: () => ({
    loading: 0,
    isMounted: false,
    map: null,
    markers: [],
    salon: {},
    locationMarkers: [],
    geoLocationDenied: false,
    enableFullScreenMap: false,
    oms: [],
    infowindow: {},
	  overlayView: null,
  }),
  computed: {
    mapIsFullscreen() {
      return true;
      // return this.$store.getters['search/mapIsFullscreen'];
    },
  },
  methods: {
    setUpInfoWindow() {
      this.infowindow = new this.$google.maps.InfoWindow({
        content: `<div></div>`
      });
      const infoWindow = this.infowindow
      this.$google.maps.event.addListener(this.map, "click", function() {
        infoWindow.close();
      });
      this.$google.maps.event.addListener(this.map, 'idle', () => {
          Object.getPrototypeOf(this.oms).formatMarkers.call(this.oms);
      });
    },
    populateMarkers() {
      const bounds = new this.$google.maps.LatLngBounds()
      let docStyle = getComputedStyle(document.documentElement);
      let primaryColor = docStyle.getPropertyValue('--v-primary-base').replace('#', '%23');
      let primaryContrastColor = docStyle.getPropertyValue('--v-primary-text-base').replace('#', '%23')

      /**
       * CREATE MARKERS AND ADD THEM TO DATA VARIABLES
       */
      var salonsLoop = new Promise((resolve, reject) => {
        this.salons.forEach((salon) => {
          var salonLat = salon.mapLatitude.includes(',') ? salon.mapLatitude.replace(',', '.') : salon.mapLatitude;
          var salonLong = salon.mapLongitude.includes(',') ? salon.mapLongitude.replace(',', '.') : salon.mapLongitude;
          const searchPosition = new this.$google.maps.LatLng(salonLat, salonLong);
          
          this.oms = new this.$google.oms(this.map, { 
						markersWontMove: true,
            markersWontHide: true,
            keepSpiderfied: true,
            circleStartAngle: 180,
            circleFootSeparation: 80,
            legWeight: 3,
					});

          let searchMarker = new Marker({
            marker: new this.$google.maps.Marker({
              position: searchPosition,
              map: this.map,
              animation: this.$google.maps.Animation.DROP,
              zIndex: 1, // Alway prioritize salon pins over location marker
              optimized: true,
              opacity: 1,
              title: salon.title,
              salon: salon
            }),
          });
          this.markers.push(searchMarker.marker)
          this.locationMarkers.push(searchMarker)
        
          bounds.extend(searchPosition);
        })
        resolve();
      })

      /**
       * AFTER MARKERS ARE CREATED, CLUSTERING IS ADDED
       */
      salonsLoop.then(() => {
        const clusterIcon = {
          url: `data:image/svg+xml;utf-8, \ <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"> \ <circle cx="18" cy="18" r="18" fill="${primaryColor}"/> \ </svg>`,
          anchor: new google.maps.Point(12, 26),
        };
        var cluster = new MarkerClusterer({
          algorithm: new GridAlgorithm({gridSize: 85}), 
          map:this.map, 
          markers:this.markers, 
          maxZoom: 18, 
          minZoom: 4.5,
          renderer: {
            render: ({ count, position }) =>
              new this.$google.maps.Marker({
                label: { text: String(count), color: primaryContrastColor.replace('%23', '#'), fontSize: "20px", fontWeight: '700' },
                position,
                zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
                icon: clusterIcon,
              }),
          }, 
        })
      })

      
    /**
     * FOR EVERY MARKER, ADD A LISTENER WHICH ASSIGNS APPROPRIATE ICON AND LABEL (NORMAL OR SPIDERFIABLE)
     * THEN ADD THE MARKER TO THE OVERLAPPINGMARKERSPIDERFIER INSTANCE, AND ASSIGN A SALON INFOWINDOW
     */
      setTimeout(async () => {
        this.locationMarkers.forEach((locationMark) => {
          //variables
          const iw = this.infowindow
          const marker = locationMark.marker
          const ComponentClass = Vue.extend(SearchMapInfoWindowCard)
          const isMobile = this.isMounted && this.$vuetify.breakpoint.smAndDown;
          var instance = new ComponentClass({
            propsData: { salon: marker.salon, isMobile },
            store: this.$store,
            router: this.$router,
          })
          //Listener
          this.oms.addListener('format', function(marker, status) {
            var spiderfiableIconUrl = `data:image/svg+xml;utf-8, \ <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"> \ <circle cx="18" cy="18" r="18" fill="${primaryColor}"/> \ </svg>`
            var unspiderfiableIcon = `data:image/svg+xml;utf-8, \ <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"> \ <circle fill="${primaryColor}" cx="18" cy="18" r="18"/> \ <path d="M28 13.8195C28.0048 13.7563 28.0048 13.6928 28 13.6295L26 8.62952C25.9219 8.43188 25.7828 8.26426 25.603 8.15098C25.4232 8.0377 25.212 7.98465 25 7.99952H11C10.7997 7.99933 10.604 8.05928 10.4382 8.1716C10.2724 8.28393 10.1441 8.44346 10.07 8.62952L8.07 13.6295C8.06518 13.6928 8.06518 13.7563 8.07 13.8195C8.03677 13.8752 8.01311 13.936 8 13.9995C8.01113 14.6908 8.20123 15.3673 8.55174 15.9632C8.90226 16.5591 9.40124 17.0539 10 17.3995V26.9995C10 27.2647 10.1054 27.5191 10.2929 27.7066C10.4804 27.8942 10.7348 27.9995 11 27.9995H25C25.2652 27.9995 25.5196 27.8942 25.7071 27.7066C25.8946 27.5191 26 27.2647 26 26.9995V17.4395C26.6046 17.0905 27.1072 16.5893 27.4581 15.9859C27.809 15.3824 27.9958 14.6976 28 13.9995C28.0094 13.9399 28.0094 13.8792 28 13.8195ZM19 25.9995H17V21.9995H19V25.9995ZM24 25.9995H21V20.9995C21 20.7343 20.8946 20.48 20.7071 20.2924C20.5196 20.1049 20.2652 19.9995 20 19.9995H16C15.7348 19.9995 15.4804 20.1049 15.2929 20.2924C15.1054 20.48 15 20.7343 15 20.9995V25.9995H12V17.9995C12.5695 17.9963 13.1317 17.8715 13.6491 17.6335C14.1664 17.3956 14.627 17.0498 15 16.6195C15.3754 17.0452 15.837 17.386 16.3542 17.6195C16.8715 17.853 17.4325 17.9738 18 17.9738C18.5675 17.9738 19.1285 17.853 19.6458 17.6195C20.163 17.386 20.6246 17.0452 21 16.6195C21.373 17.0498 21.8336 17.3956 22.3509 17.6335C22.8683 17.8715 23.4305 17.9963 24 17.9995V25.9995ZM24 15.9995C23.4696 15.9995 22.9609 15.7888 22.5858 15.4137C22.2107 15.0387 22 14.53 22 13.9995C22 13.7343 21.8946 13.48 21.7071 13.2924C21.5196 13.1049 21.2652 12.9995 21 12.9995C20.7348 12.9995 20.4804 13.1049 20.2929 13.2924C20.1054 13.48 20 13.7343 20 13.9995C20 14.53 19.7893 15.0387 19.4142 15.4137C19.0391 15.7888 18.5304 15.9995 18 15.9995C17.4696 15.9995 16.9609 15.7888 16.5858 15.4137C16.2107 15.0387 16 14.53 16 13.9995C16 13.7343 15.8946 13.48 15.7071 13.2924C15.5196 13.1049 15.2652 12.9995 15 12.9995C14.7348 12.9995 14.4804 13.1049 14.2929 13.2924C14.1054 13.48 14 13.7343 14 13.9995C14.0098 14.2622 13.9679 14.5242 13.8765 14.7706C13.7851 15.017 13.646 15.243 13.4672 15.4357C13.2885 15.6284 13.0735 15.784 12.8347 15.8936C12.5958 16.0032 12.3376 16.0647 12.075 16.0745C11.5446 16.0944 11.028 15.9028 10.6388 15.5418C10.4461 15.363 10.2906 15.1481 10.1809 14.9092C10.0713 14.6703 10.0098 14.4122 10 14.1495L11.68 9.99952H24.32L26 14.1495C25.9621 14.6535 25.7348 15.1245 25.3637 15.4677C24.9927 15.8109 24.5054 16.0009 24 15.9995Z" fill="${primaryContrastColor}"/> \ </svg>` 
            var iconURL = 
              status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED ? unspiderfiableIcon :
              status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE ? spiderfiableIconUrl :
              status == OverlappingMarkerSpiderfier.markerStatus.UNSPIDERFIABLE ? unspiderfiableIcon : 
              unspiderfiableIcon;
              marker.setIcon(iconURL);
              if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE) marker.set('label', { text: '+', color: primaryContrastColor.replace('%23', '#'), fontSize: "20px", fontWeight: '700' });
              else marker.set('label', { text: marker.salon.name, className: 'marker-label'})
          });
          //Add markers to oms
          this.oms.addMarker(marker, function(e) {
            
            iw.close();

            instance.$slots.default = [ 'Bestill time' ]
            instance.$mount()
            iw.setContent(instance.$el);
            iw.open(this.map, marker);
          });

          this.map.fitBounds(bounds);
          //Set default zoom to a maximum of 14 to give the markers some padding. The user can still manually zoom to 18 if needed.
          this.map.getZoom() >= 14 ? this.map.setZoom(14) : () => {return}
        })
      }, 1000);
    },
   
    /**
     * Load Google Maps script
     */
    loadGoogleMaps() {
      return new Promise((resolve) => {
        this.loading++;
        const gmaps = document.createElement("script");
        gmaps.src = `https://maps.googleapis.com/maps/api/js?key=${this.$google.googleApiKey}&libraries=places,geometry`;
        gmaps.async = false;
        gmaps.defer = true;
        gmaps.onload = () => {
          Object.assign(this.$google, {
            maps: window.google.maps,
          });
          this.loading--;
          resolve();
        };

        document.head.appendChild(gmaps);
      });

    },
    loadOverlappingMakerSpiderfier() {
      return new Promise((resolve) => {
        this.loading++;
        const gmaps = document.createElement("script");
        gmaps.src = `https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier/1.0.3/oms.js`;
        gmaps.async = true;
        gmaps.defer = true;
        gmaps.onload = () => {
          Object.assign(this.$google, {
            oms: window.OverlappingMarkerSpiderfier,
          });
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
      return new Promise((resolve) => {
        this.loading++;
        this.$nextTick(() => {
          // Construct map
          this.map = new this.$google.maps.Map(this.$refs.map, {
            center: new this.$google.maps.LatLng(60.397076, 5.324383),
            //scrollwheel: !this.$vuetify.breakpoint.smAndDown,
            mapTypeControl: false,
            minZoom: 4.5,
            maxZoom: 18,
            gestureHandling: this.isMounted && this.$vuetify.breakpoint.smAndDown
              ? "auto"
              : "cooperative",
            fullscreenControl: false,
            streetViewControl: true,
            disableDefaultUI: false,
            restriction: {
              // Set Norway as restricted bounds
              latLngBounds: new this.$google.maps.LatLngBounds(
                new this.$google.maps.LatLng(57.621899, -8.817703),
                new this.$google.maps.LatLng(71.594412, 33.523407)
              ),
            },
            mapTypeId: this.$google.maps.MapTypeId.ROADMAP,
            styles,
          });

          this.$nextTick(() => {

             // // Listener for map bounds changes
            // this.$google.maps.event.addListener(this.map, 'idle', this.boundsChanged);

            // // Listener for map drag event
            // this.$google.maps.event.addListener(this.map, 'drag', this.mapDragged);

            // Overlay view for animated markers
            this.overlayView = new this.$google.maps.OverlayView();
            this.overlayView.draw = function () {
              this.getPanes().markerLayer.id = "OverlayView";
            };
            this.overlayView.setMap(this.map);
          });
          
          this.loading--;
          resolve();
        });
      });
    },
  },
  async beforeMount() {
    if (!this.$google.maps) await this.loadGoogleMaps();
    if (!this.$google.oms) await this.loadOverlappingMakerSpiderfier();
    if (!this.map) await this.mountMap();
    if (this.salons.length > 0) {
      this.setUpInfoWindow()
      this.populateMarkers()
    }

  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
<style lang="scss">
.marker-label {
  white-space: pre-wrap;
  margin-left: 140px;
  padding: 2px;
  text-align: left;
  font-weight: 700 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  width: 100px !important;
  background: white !important;
}

@keyframes map-pin-loading {
  50% {
    opacity: 0.75;
  }
}

.search-map {
  position: relative;
  width: 100%;
  height: 100%;

  .map-fullscreen {
    position: absolute;
    right: 10px;
    top: 13px;

    .btn-fullscreen-toggle {
      min-width: 0;
      min-height: 0;
      height: 35px;
      width: 35px;
      padding: 0 !important;
    }
  }

  &.fullscreen {
    position: fixed !important;
    // top: var(--map-offset-top-fullscreen);
    left: 0;
    right: 0;
    bottom: 0;
    // height: -moz-calc(100% - var(--map-offset-top-fullscreen));
    // height: -webkit-calc(100% - var(--map-offset-top-fullscreen));
    // height: calc(100% - var(--map-offset-top-fullscreen));
  }

  &__loader {
    position: absolute;
    top: 0;

    &::v-deep .v-skeleton-loader__bone {
      height: 100%;
    }
  }
  &__mobile-click-area {
    // transition: background 1s ease;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>