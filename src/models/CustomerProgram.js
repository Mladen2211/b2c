// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class CustomerProgram {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
        this.customer = args.customer || null
        this.isMember = args.customer ? args.customer.isInCustomerProgram : false|| false
        this.programName = args.programName || ''
        this.joinedDate = '01.01.0001' || '' //Need this from backend
        this.pointsEarned = args.customer ? args.customer.bonusPointBalance : 0 || 0
        this.chain = args.chain || null
        this.chainId = args.chainId || null
        this.programDescription = args.info || ''
        this.joinDescription = args.info || '' //Need this from backend (No tool to add join description yet...)
        this.termsOfUse = args.termsOfUse || ''
        this.pointsHistory = args.customer ? args.customer.pointsHistory : [] || [] //Need this from backend. New pointsHistory object created here
        this.customerCategories = args.customerCategories || []
        this.customerProgramId = args.customerProgramId || 0
        this.defaultCustomerCategoryId = args.defaultCustomerCategoryId || ''
	}

	assign(program) {
		Object.assign(this, toCamelCaseProperties(program));
	}
}
