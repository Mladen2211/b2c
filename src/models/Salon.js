// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class Salon {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
        this.address = args.address || ''
        this.imgUrl = args.imageLocation || ''
        this.name = args.name || ''
        this.distance = args.distance || null
        this.mapLatitude = args.mapLatitude || ''
        this.mapLongitude = args.mapLongitude || ''
        this.chainId = args.chainId || null
        this.siteId = args.siteId || null
        this.availableCategories = args.availableCategories || []
        this.availableTreatments = args.availableTreatments || []
        this.averageRating = args.averageRating
	}

	assign(salon) {
		Object.assign(this, toCamelCaseProperties(salon));
	}
}
