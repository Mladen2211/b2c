import { toCamelCaseProperties } from '@fixit/utils';
import { OpeningHourSimple } from './Site';

export default class GeoLocation {
	constructor({
		description = '',
		displayName = '',
		id = 0,
		imageUrl,
		latitude = 0,
		longitude = 0,
		name = '',
		placeId = '',
		siteId = 0,
		type = '',
		types = [],
		url = '',
		urlFrendlyLink = '',
		...args
	} = {}) {
		this.description = description;
		this.displayName = args.search || displayName || name;
		this.id = id;
		this.imageUrl = imageUrl;
		this.latitude = parseFloat(latitude);
		this.longitude = parseFloat(longitude);
		this.name = args.search || name || displayName;
		this.placeId = placeId;
		this.siteId = parseInt(siteId);
		this.type = type;
		this.types = types;
		this.url = url;
		this.urlFrendlyLink = urlFrendlyLink;
	}

	getSuggestionType() {
		let suggestionType = '2_salon';

		if (this.type === 'Geo') {
			if (this.types.includes('political') || this.types.includes('sublocality')) {
				suggestionType = '0_place';
			} else if (this.types.includes('establishment')) {
				suggestionType = '3_establishment';
			} else {
				suggestionType = '1_address';
			}
		} else if (this.type === 'NearYou') {
			if (this.types.includes('my_location')) {
				suggestionType = '4_my_location';
			}
		}

		return suggestionType;
	}

	getSuggestionTypeIcon() {
		switch (this.getSuggestionType()) {
			case '0_place':
				return 'location_city';

			case '2_salon':
				return 'home';

			case '4_my_location':
				return 'person_pin_circle';

			case '1_address':
			case '3_establishment':
			default:
				return 'location_on';
		}
	}

	static sort(a, b) {
		if (a instanceof GeoLocation && b instanceof GeoLocation) {
			if (a.getSuggestionType() < b.getSuggestionType()) {
				return -1;
			} else if (a.getSuggestionType() > b.getSuggestionType()) {
				return 1;
			}
		}

		return 0;
	}
}

export class GeoCode {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		this.location = args.location; // geocoding response object
		this.address = args.address || this.location.formatted_address || null;
		this.latitude = args.latitude || this.location.geometry.location.lat || null;
		this.longitude = args.longitude || this.location.geometry.location.lng || null;
	}
}

export class Marker {
	constructor( args ) {
		args = toCamelCaseProperties(args) || {};
		this.name = args.name || '';
		this.siteId = args.siteId || 0;
		this.chainId = args.chainId || 0;
		this.urlFrendlyLink = args.urlFrendlyLink || '';
		this.imageLocation = args.imageLocation || '';
		this.chainImageLocation = args.chainImageLocation || '';
		this.latitude = parseFloat(args.mapLatitude || args.latitude || 0);
		this.longitude = parseFloat(args.mapLongitude || args.longitude || 0);
		this.availableCategories = args.availableCategories || [];
		this.availableTreatments = args.availableTreatments || [];

		// Reference to Google Maps marker object
		this.marker = args.marker;

		// Reference to AvailableTime.available
		this.available = [true, undefined].includes(args.available);
	}
}

export class MarkerDetails extends Marker {
	constructor(args) {
		super(args);
		args = toCamelCaseProperties(args) || {};

		this.imageLocationSquare = args.imageLocationSquare || '';
		this.urlFrendlyName = args.urlFrendlyName || '';
		this.description = args.description || '';
		this.phone = args.phone || '';
		this.address = args.address || '';
		this.postalCode = args.postalCode || '';
		this.postalArea = args.postalArea || '';
		this.distance = args.distance || 0;
		this.chainLogoImageVersion = args.chainLogoImageVersion || 0;
		this.avarageRating = parseFloat(args.avarageRating || 0);
		this.ratingCommentsFixitnoCount = parseInt(args.ratingCommentsFixitnoCount || 0);
		this.noOfRatings = parseInt(args.noOfRatings || 0);
		this.openingHours = args.openingHours;
		this.openingHoursExceptions = args.openingHoursExceptions;
		this.previewTreatments = args.previewTreatments;
		this.startHoures = args.startHoures || '';
		this.endHoures = args.endHoures || '';
		this.startHourExceptions = args.startHourExceptions || '';
		this.endHourExceptions = args.endHourExceptions || '';
		this.isOpen = !!args.isOpen;
		this.isOpenException = !!args.isOpenException;

		// Opening hours
		this.openingHourToday = new OpeningHourSimple( {from: this.startHoures, to: this.endHoures, isOpen: this.isOpen} )

		// TODO: Add next day with openinghour.. 
	}
}
