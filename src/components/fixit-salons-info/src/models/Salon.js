// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class Salon {
    constructor( args ) {
        args = toCamelCaseProperties( args ) || {};
        this.openingHours = args.openingHours || []
        this.active = args.active  
        this.address = args.address || ''
        this.androidActive = args.androidActive 
        this.androidActiveAndEnabled = args.androidActiveAndEnabled 
        this.androidEnabled = args.androidEnabled  
        this.appointmentButtonOverrideText = args.appointmentButtonOverrideText || ''
        this.appointmentButtonOverrideUrl = args.appointmentButtonOverrideUrl || ''
        this.availableCategories = args.availableCategories || []
        this.availableTreatments = args.availableTreatments || []
        this.averageRating = args.averageRating || 0
        this.bankAccountNumber = args.bankAccountNumber || ''
        this.bonusLifeTime = args.bonusLifeTime || ''
        this.bookingHours = args.bookingHours || []
        this.cancelationHours = args.cancelationHours || []
        this.cancelationText = args.cancelationText || ''
        this.cancelationTitle = args.cancelationTitle || ''
        this.cancellationTextProduct = args.cancellationTextProduct || ''
        this.chainId = args.chainId || 0
        this.chainLogoImageVersion = args.chainLogoImageVersion || ''
        this.collectAtStoreEnabled = args.collectAtStoreEnabled || ''
        this.customerNote = args.customerNote || ''
        this.departmentProgress = args.departmentProgress || ''
        this.description = args.description || ''
        this.distanceFromLocationInMeters = args.distanceFromLocationInMeters || '' 
        this.distanceFromUser = args.distanceFromUser || ''
        this.email = args.email || ''
        this.emailConfirmationSenderAddress = args.emailConfirmationSenderAddress || ''
        this.emailConfirmationSubject = args.emailConfirmationSubject || ''
        this.emailConfirmationText = args.emailConfirmationText || ''
        this.emailProductReservationSubject = args.emailProductReservationSubject || ''
        this.emailProductReservationText = args.emailProductReservationText || ''
        this.enabled = args.enabled
        this.endHourExceptions = args.endHourExceptions || []
        this.endHours = args.endHours || []
        this.extraTextTreatments = args.extraTextTreatments || ''
        this.faceBookUrl = args.faceBookUrl || ''
        this.facebookUrlEnabled = args.facebookUrlEnabled || ''
        this.hasAvailableCampaigns = args.hasAvailableCampaigns
        this.hideEmployees = args.hideEmployees 
        this.homePageUrl = args.homePageUrl || ''
        this.imageLocation = args.imageLocation || ''
        this.imgAltDesciption = args.imgAltDesciption || ''
        this.industry = args.industry || ''
        this.instagramUrl = args.instagramUrl || ''
        this.instagramUrlEnabled = args.instagramUrlEnabled
        this.invoiceAddress = args.invoiceAddress || ''
        this.invoicePostalArea = args.invoicePostalArea || ''
        this.invoicePostalCode = args.invoicePostalCode || ''
        this.iphoneActive = args.iphoneActive 
        this.iphoneActiveAndEnabled = args.iphoneActiveAndEnabled
        this.iphoneEnabled = args.iphoneEnabled
        this.isOpen = args.isOpen
        this.isOpenException = args.isOpenException || []
        this.journalCustomFieldAnamnese = args.journalCustomFieldAnamnese || ''
        this.journalCustomFieldDiagnosis = args.journalCustomFieldDiagnosis || ''
        this.journalCustomFieldTreatment = args.journalCustomFieldTreatment || ''
        this.mapLatitude = args.mapLatitude || ''
        this.mapLongitude = args.mapLongitude || ''
        this.mapReferenceUseContactInfo = args.mapReferenceUseContactInfo 
        this.mapUrl = args.mapUrl || ''
        this.metaDescription = args.metaDescription || ''
        this.metaKeywords = args.metaKeywords || ''
        this.mobileThemeName = args.mobileThemeName || ''
        this.mobileThemeVersion = args.mobileThemeVersion || ''
        this.name = args.name || ''
        this.noOfRatings = args.noOfRatings || 0
        this.odinTreatmentIds = args.odinTreatmentIds || []
        this.open = args.open 
        this.openNoConnection = args.openNoConnection 
        this.orderDayBeforeReminder = args.orderDayBeforeReminder
        this.orderSameDayReminder = args.orderSameDayReminder
        this.organizationNumber = args.organizationNumber || ''
        this.pageUrlForSharing = args.pageUrlForSharing || ''
        this.phone = args.phone || ''
        this.pickUpText = args.pickUpText || ''
        this.postalArea = args.postalArea || ''
        this.postalCode = args.postalCode || ''
        this.previewTreatments = args.previewTreatments || []
        this.productReservationGraceDays = args.productReservationGraceDays || ''
        this.productReservationPickUpMinutes = args.productReservationPickUpMinutes || ''
        this.productReservationPickUpText = args.productReservationPickUpText || ''
        this.ratingCommentsFixitnoCount = args.ratingCommentsFixitnoCount || 0
        this.sendEmailConfirmation = args.sendEmailConfirmation
        this.sendEmailConfirmationToSite = args.sendEmailConfirmationToSite
        this.sendSmsConfirmation = args.sendSmsConfirmation
        this.showInFixItNo = args.showInFixItNo
        this.showPrice = args.showPrice
        this.site = args.site || ''
        this.siteId = args.siteId || 0
        this.smsConfirmationText = args.smsConfirmationText || '' 
        this.smsProductReservationText = args.smsProductReservationText || ''
        this.smsSenderNumber = args.smsSenderNumber || ''
        this.snapchatUrl = args.snapchatUrl || ''
        this.snapchatUrlEnabled = args.snapchatUrlEnabled
        this.sortOnPopularity = args.sortOnPopularity
        this.startHourExceptions = args.startHourExceptions || []
        this.startHoures = args.startHoures || []
        this.status = args.status || 0
        this.timeSuggestionSize = args.timeSuggestionSize || '' 
        this.urlFrendlyLink = args.urlFrendlyLink || ''
        this.urlLink = args.urlLink || ''
        this.useChainLogo = args.useChainLogo
    }
}