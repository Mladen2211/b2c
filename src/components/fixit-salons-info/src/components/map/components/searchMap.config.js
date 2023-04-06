export const mapSettings = {
	MIN_LIMIT_MERGE_SEARCHED_LOCATION_AND_CURRENT_LOCATION_MAP_PIN: 50, // distance from the searched location and the current location
	MAX_LIMIT_MERGE_SEARCHED_LOCATION_AND_CURRENT_LOCATION_MAP_PIN: 5000	// distance from the searched location and the current location
}

export const preferredZoom = {
	NEARYOU: 12,
	CITY: 12,
	SUBLOCALITY: 13,
	STREET_ADDRESS_ROUTE: 15,
	ESTABLISHMENT: 15,
	COUNTY: 7,
	COUNTRY: 5
};

export const getPreferredZoom = (searchType = '', types = []) => {
	switch (searchType.toLowerCase()) {
		case 'geo':
			if (types.includes('locality')) return preferredZoom.CITY;
			else if (types.includes('sublocality')) return preferredZoom.SUBLOCALITY;
			else if (types.includes('route') || types.includes('street_address')) return preferredZoom.STREET_ADDRESS_ROUTE;
			else if (types.includes('establishment')) return preferredZoom.ESTABLISHMENT;
			else if (types.includes('administrative_area_level_1')) return preferredZoom.COUNTY;
			else if (types.includes('country')) return preferredZoom.COUNTRY;
			return preferredZoom.CITY;
		case 'nearyou':
		default:
			return preferredZoom.NEARYOU;
	}
};

const iconBaseUrl = '/assets/images/maps';
export const icons = {
	SALON_PIN: iconBaseUrl + 'map-pin-site.svg',
	SALON_PIN_HIGHLIGHTED: iconBaseUrl + 'map-pin-site-highlight.svg',
	SALON_PIN_MULTIPLE_SITES: iconBaseUrl + 'map-pin-multiple-sites.svg',
	SALON_UNAVAILABLE_PIN: iconBaseUrl + 'map-pin-site-unavailable.svg',
	LOCATION_PIN: iconBaseUrl + 'map-pin-location.svg',
	PERSON_PIN: iconBaseUrl + 'map-pin-person.svg'
};

export const styles = [
	{
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
            {
                saturation: 36
            },
            {
                color: "#333333"
            },
            {
                lightness: 40
            }
        ]
    },
    {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "on"
            },
            {
                color: "#ffffff"
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#fefefe"
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#fefefe"
            },
            {
                lightness: 17
            },
            {
                weight: 1.2
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#f2f2f2"
            },
            {
                lightness: "0"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#d6d7de"
            },
            {
                lightness: "0"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#d6d7de"
            },
            {
                lightness: "0"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffffff"
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff"
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff"
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#f2f2f2"
            },
            {
                lightness: 19
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#b9c1c8"
            },
            {
                lightness: "0"
            }
        ]
    }
];
