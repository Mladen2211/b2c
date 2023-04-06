// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class FavoriteProduct {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};
		this.siteId = args.siteId || 0
		this.salon = args.salon || ''
		this.productName = args.productName || ''
		this.productNameUrlSafe = args.productNameUrlSafe || ''
		this.productIdBase64 = args.productIdBase64 || ''
		this.productId = args.productId || ''
		this.imgUrl = args.imgUrl || ''
		this.brand = args.brand || ''
		this.chainId = args.chainId || 0
	}

	assign(product) {
		Object.assign(this, toCamelCaseProperties(product));
	}
}
