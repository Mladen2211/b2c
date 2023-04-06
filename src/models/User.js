// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class User {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
		this.onlineSluttKundeId = args.onlineSluttKundeId || 0
		this.mobileNumber = 'mobileNumber' in args ? args.mobileNumber ? args.mobileNumber.replace(/ /g, '') : args.mobileNumber || '' : 'mobile' in args ? args.mobile.replace(/ /g, '') : args.mobile || '';
		this.userId = args.userId || '00000000-0000-0000-0000-000000000000'
		this.profileCreatedTime = args.profileCreatedTime || new Date()
		this.profileUpdatedTime = args.profileUpdatedTime || new Date()
		this.firstName = args.firstName || ''
		this.lastName = args.lastName || ''
		this.email = args.email || ''
		this.gender = args.gender || null
		this.address = args.address || ''
		this.postalCode = args.postalCode || ''
		this.postalArea = args.postalArea || ''
		this.conditionsApproved = 'conditionsApproved' in args ? !!args.conditionsApproved : false;
		this.birthDate = args.birthDate || null,
		this.fixitNoProfileDeleted = args.fixitNoProfileDeleted
		this.phoneNoHome = args.phoneNoHome || ''
        this.phoneNoWork = args.phoneNoWork || ''
	}

	assign(user) {
		Object.assign(this, toCamelCaseProperties(user));
	}
}
