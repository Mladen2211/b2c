// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class FavoriteEmployee {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
		this.firstName = args.firstName || ''
		this.lastName = args.lastName || ''
		this.imgUrl = args.imageUrl || ''
		this.salon = args.siteName || ''
		this.siteId = args.site || ''
		this.salonUrlSafe = args.siteNameUrlSafe || ''
		this.nameUrlSafe = args.nameUrlSafe || ''
		this.employeeId = args.employeeId || ''
	}

	assign(employee) {
		Object.assign(this, toCamelCaseProperties(employee));
	}
}
