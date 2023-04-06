// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class Notification {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
		this.visible = args.visible || false
        this.duration = args.duration || 3000
        this.state = args.state || ''
        this.message = args.message || ''
	}

	assign(snackbar) {
		Object.assign(this, toCamelCaseProperties(snackbar));
	}
}
