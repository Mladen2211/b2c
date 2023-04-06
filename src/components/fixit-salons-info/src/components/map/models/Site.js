import { toCamelCaseProperties } from '@fixit/utils';
import moment from 'moment';

export default class Site {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		this.active = !!args.active;
		this.address = args.address || '';
		this.androidActive = !!args.androidActive;
		this.androidEnabled = !!args.androidEnabled;
		this.appointmentButtonOverrideText = args.appointmentButtonOverrideText || '';
		this.appointmentButtonOverrideUrl = args.appointmentButtonOverrideUrl || '';
		this.averageRating = args.averageRating || 0;
		this.bonusLifeTime = args.bonusLifeTime || 0;
		this.bookingHours = args.bookingHours || 0;
		this.cancelationHours = args.cancelationHours || 0;
		this.cancelationText = args.cancelationText || '';
		this.cancelationTitle = args.cancelationTitle || '';
		this.cancellationTextProduct = args.cancellationTextProduct || '';
		this.chainId = args.chainId || 0;
		this.chainLogoImageVersion = args.chainLogoImageVersion || 0;
		this.collectAtStoreEnabled = !!args.collectAtStoreEnabled;
		this.customerNote = !!args.customerNote;
		this.departmentProgress = args.departmentProgress || 0;
		this.description = args.description || '';
		this.distanceFromLocationInMeters = args.distanceFromLocationInMeters || 0;
		this.email = args.email || '';
		this.emailConfirmationSenderAddress = args.emailConfirmationSenderAddress || '';
		this.emailConfirmationSubject = args.emailConfirmationSubject || '';
		this.emailConfirmationText = args.emailConfirmationText || '';
		this.emailProductReservationSubject = args.emailProductReservationSubject || '';
		this.emailProductReservationText = args.emailProductReservationText || '';
		this.enabled = !!args.enabled;
		this.extraTextTreatments = args.extraTextTreatments || '';
		this.faceBookUrl = args.faceBookUrl || '';
		this.facebookUrlEnabled = !!args.facebookUrlEnabled;
		this.hasAvailableCampaigns = !!args.hasAvailableCampaigns;
		this.hideEmployees = !!args.hideEmployees;
		this.homePageUrl = args.homePageUrl || '';
		this.imageLocation = args.imageLocation || '';
		this.imgAltDesciption = args.imgAltDesciption || '';
		this.industry = args.industry || 0;
		this.instagramUrl = args.instagramUrl || '';
		this.instagramUrlEnabled = !!args.instagramUrlEnabled;
		this.invoiceAddress = args.invoiceAddress || '';
		this.invoicePostalArea = args.invoicePostalArea || '';
		this.invoicePostalCode = args.invoicePostalCode || '';
		this.iphoneActive = !!args.iphoneActive;
		this.iphoneEnabled = !!args.iphoneEnabled;
		this.mapLatitude = args.mapLatitude || '';
		this.mapLongitude = args.mapLongitude || '';
		this.mapReferenceUseContactInfo = args.mapReferenceUseContactInfo || 0;
		this.mapUrl = args.mapUrl || '';
		this.metaDescription = args.metaDescription || '';
		this.metaKeywords = args.metaKeywords || '';
		this.mobileThemeName = args.mobileThemeName || '';
		this.mobileThemeVersion = args.mobileThemeVersion || 0;
		this.name = args.name || '';
		this.odinTreatmentIds = args.odinTreatmentIds;
		this.open = !!args.open;
		this.openNoConnection = !!args.openNoConnection;
		this.orderDayBeforeReminder = !!args.orderDayBeforeReminder;
		this.orderSameDayReminder = !!args.orderSameDayReminder;
		this.pageUrlForSharing = args.pageUrlForSharing || 0;
		this.phone = args.phone || '';
		this.pickUpText = args.pickUpText || '';
		this.postalArea = args.postalArea || '';
		this.postalCode = args.postalCode || '';
		this.previewTreatments = args.previewTreatments;
		this.productReservationGraceDays = args.productReservationGraceDays || 0;
		this.productReservationPickUpMinutes = args.productReservationPickUpMinutes || 0;
		this.productReservationPickUpText = args.productReservationPickUpText || '';
		this.sendEmailConfirmation = !!args.sendEmailConfirmation;
		this.sendEmailConfirmationToSite = !!args.sendEmailConfirmationToSite;
		this.sendSmsConfirmation = !!args.sendSmsConfirmation;
		this.showInFixItNo = !!args.showInFixItNo;
		this.showPrice = !!args.showPrice;
		this.site = args.site || '';
		this.siteId = args.siteId || 0;
		this.smsConfirmationText = args.smsConfirmationText || '';
		this.smsProductReservationText = args.smsProductReservationText || '';
		this.smsSenderNumber = args.smsSenderNumber || '';
		this.snapchatUrl = args.snapchatUrl || '';
		this.snapchatUrlEnabled = !!args.snapchatUrlEnabled;
		this.sortOnPopularity = !!args.sortOnPopularity;
		this.status = !!args.status;
		this.timeSuggestionSize = args.timeSuggestionSize || 0;
		this.urlLink = args.urlLink || '';
		this.useChainLogo = !!args.useChainLogo;
		this.urlFrendlyLink = args.urlFrendlyLink || '';
	}
}

export class VisitedSite {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		this.address = args.address || '';
		this.averageRating = args.averageRating || 0;
		this.chainId = args.chainId || 0;
		this.chainLogoImageVersion = args.chainLogoImageVersion || 0;
		this.description = args.description || '';
		this.distanceFromLocationInMeters = args.distanceFromLocationInMeters || 0;
		this.email = args.email || '';
		this.fixitSiteId = args.fixitSiteId || '';
		this.imageExtension = args.imageExtension || '';
		this.imageUrl = args.imageUrl || '';
		this.chainImageUrl = args.chainImageUrl || '';
		this.industry = args.industry || 0;
		this.mapLatitude = args.mapLatitude || '';
		this.mapLongitude = args.mapLongitude || '';
		this.mapUrl = args.mapUrl || '';
		this.phone = args.phone || '';
		this.postalArea = args.postalArea || '';
		this.postalCode = args.postalCode || '';
		this.siteId = args.siteId || 0;
		this.siteName = args.siteName || '';
		this.urlLink = args.urlLink || '';
		this.useChainLogo = !!args.useChainLogo;
		this.urlFrendlyLink = args.urlFrendlyLink || '';
		this.openingHours = args.openingHours.map(openingHour => new OpeningHour(openingHour));
		this.hasBooking = args.hasBooking || false;
	}

	getDistanceFromLatLonInKm(lat1, lon1) {
		function deg2rad(deg) {
			return deg * (Math.PI / 180)
		}

		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(this.mapLatitude - lat1);  // deg2rad below
		var dLon = deg2rad(this.mapLongitude - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(this.mapLatitude)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);

		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}

	get getShortAddress() {
		return this.address + ', ' + this.postalCode + ' ' + this.postalArea;
	}

	get getIsOpenNow() {
		return !this.getIsBeforeOpeningHours && !this.getIsPastOpeningHours;
	}
	get getIsPastOpeningHours() {
		const now = moment();
		const closeTime = moment(this.getTodaysOpeningHours.to, 'hh:mm');
		return closeTime.isBefore(now);
	}

	get getIsBeforeOpeningHours() {
		const now = moment();
		const closeTime = moment(this.getTodaysOpeningHours.from, 'hh:mm');
		return now.isBefore(closeTime);
	}

	get getHasOpeningHours() {
		return this.openingHours;
	}

	get getTodaysOpeningHours() {
		let openingHour = {
			from: '',
			to: ''
		};
		const today = moment();
		this.openingHours.forEach(item => {
			if (today.isoWeekday() == item.dayNumber) {
				openingHour = item;
			}
		});

		return {
			from: openingHour.from.substring(0, 5),
			to: openingHour.to.substring(0, 5)
		};
	}
}

export class OpeningHour {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		this.dayNumber = args.dayNumber || '';
		this.from = args.from || '';
		this.to = args.to || '';
		this.openByAppointment = args.openByAppointment || false;
		this.siteId = args.siteId || '';
		this.isOpen = args.isOpen || false;
	}
}

export class OpeningHourSimple {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		/*
		 * We don't use timezones when displaying opening hours.
		 * Therefore we're setting the datetime served from the webmethod as DateTimeKind.Local.
		 * This way the date will be correctly handled in Javascript.
		 */

		this.from = moment.utc(args.from, 'YYYY-MM-DD HH:mm:ss [UTC]');
		this.to = moment.utc(args.to, 'YYYY-MM-DD HH:mm:ss [UTC]');
		this.isOpen = args.isOpen || false;
	}

	// Helpers
	get fromFormatted(){
		return this.from.format('HH:mm');
	}
	get toFormatted(){
		return this.to.format('HH:mm');
	}
	get getIsOpenNow() {
		const now = moment(); // '2020-04-02 09:59' // For Testing

		// Adding today's date on each openinghour for easy comparison
		const from = moment(now.format('YYYY-MM-DD' + ' ' + this.from.format('HH:mm')));
		const to = moment(now.format('YYYY-MM-DD' + ' ' + this.to.format('HH:mm')));
		return from.isSameOrBefore(now) && now.isBefore(to) && this.isOpen;

	}
	get getIsPastOpeningHours() {
		const now = moment();
		const closeTime = moment(now.format('YYYY-MM-DD' + ' ' + this.to.format('HH:mm')));
		return closeTime.isBefore(now);
	}
	get getIsBeforeOpeningHours() {
		const now = moment();
		const closeTime = moment(now.format('YYYY-MM-DD' + ' ' + this.from.format('HH:mm')));
		return now.isBefore(closeTime);
	}
}

export class AvailableTime {
	constructor(args) {
		args = toCamelCaseProperties(args) || {};

		this.availableTimeString = args.availableTimeString || '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
		this.date = args.date && new Date(args.date);
		this.longestAvailableTimeSlot = args.longestAvailableTimeSlot || 0;
		this.siteId = args.siteId || 0;
		this.treatmentId = args.treatmentCategoryId || args.treatmentId || 0;

		// Zero out `this.date`s hours, minutes, seconds and milliseconds.
		if (this.date) this.date.setHours(0, 0, 0, 0);
	}

	/**
	 * Check if site has available time for current `date`.
	 * @returns {Boolean} `true`/`false` whether or not the site has available time.
	 */
	get available() {
		return this.availableTimeString.includes(1);
	}
}
