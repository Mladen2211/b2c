// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class Order {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
        this.appointmentId = args.appointmentId || ''
        this.appointmentDate = args.appointmentDate || ''
        this.appointmentStartTime = args.appointmentStartTime || ''
        this.isCanceled = args.isCanceled || false
        this.isHistoric = args.isHistoric || false
        this.revenue = args.revenue || 0
        this.appointmentEmployeeId = args.appointmentEmployeeId || ''
        this.customerId = args.customerId || ''
        this.siteId = args.siteId || 0
        this.siteName = args.siteName || ''
        this.appointmentStatus = setAppointmentType(args.isCanceled, args.isHistoric) || ''
	}

	assign(order) {
		Object.assign(this, toCamelCaseProperties(order));
	}
}

function setAppointmentType(isCanceled, isHistoric) {
    return isCanceled ? 'cancelled' : (isHistoric && !isCanceled) ? 'previous-visit' : (!isHistoric && !isCanceled) ? 'future-visit' : ''
}
