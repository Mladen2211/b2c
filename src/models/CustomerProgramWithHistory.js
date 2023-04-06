// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';
import CustomerProgram from "../models/CustomerProgram"

export default class CustomerProgramWithHistory {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
        this.history = args.history
        this.program = new CustomerProgram(args.program)
	}

	assign(customerProgramWithHistory) {
		Object.assign(this, toCamelCaseProperties(customerProgramWithHistory));
	}
}
