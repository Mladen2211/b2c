<template>
    <div>
        <title-and-edit currentViewTitle="Personvern og samtykker" :layout="layout"/>
        <div v-if="consents.length" class="profile__container--content__consents primary-font mt-5">
            <profile-dropdown v-if="layout == 'portal'" :items="['HairSalon', 'SkinSalon', 'NailSalon']" label="Velg salong"></profile-dropdown>  
            <div class="profile__container--content__consents--subtitle mt-3 mb-6">
                <span class="pa-4">{{consentsDescription}}</span>
            </div>
            <div>
                <the-consent-toggle class="px-3 my-1" switchColor="primary" :toggled="states.MEMBERSHIP_PROGRAM" @setState="setState" title="Fordelsprogram"></the-consent-toggle>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
                <the-consent-toggle class="px-3 my-1" switchColor="primary" :toggled="states.RECOMMENDATIONS" @setState="setState" title="Timeanbefalinger"></the-consent-toggle>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
                <the-consent-toggle class="px-3 my-1" switchColor="primary" :toggled="states.INFO_NEWS_OFFERS" @setState="setState" @openDropdown="showInfoNewsOffer = !showInfoNewsOffer" title="Informasjon, nyheter og tilbud" :icon="showInfoNewsOffer ? 'fxt-chevron-up' : 'fxt-chevron-down'"></the-consent-toggle>

                <v-expand-transition>
                    <div v-if="showInfoNewsOffer">
                        <the-consent-toggle class="pr-3 pl-12 my-1" iconSize="20px" switchColor="primary" :toggled="states.SMS" :disabled="states.INFO_NEWS_OFFERS.toggleState" @setState="setState" title="SMS" icon="fxt-comment"></the-consent-toggle>
                        <the-consent-toggle class="pr-3 pl-12 my-1" iconSize="20px" switchColor="primary" :toggled="states.EMAIL" :disabled="states.INFO_NEWS_OFFERS.toggleState" @setState="setState" title="E-post" icon="fxt-mail"></the-consent-toggle>
                        <the-consent-toggle class="pr-3 pl-12 my-1" iconSize="20px" switchColor="primary" :toggled="states.DIGITAL_CHANNELS" :disabled="states.INFO_NEWS_OFFERS.toggleState" @setState="setState" title="Digitale kanaler (sosiale medier mv.)" icon="fxt-check"></the-consent-toggle>
                    </div>
                </v-expand-transition>

                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
                <the-consent-toggle v-if="layout == 'portal'" class="px-3 my-1" switchColor="primary" :toggled="states.SAME_CHOICE_GLOBALLY" @setState="setState" title="Bruk samme valg for alle mine salonger og Fixit" icon="fxt-radio-on"></the-consent-toggle>
            </div>
            <div class="d-flex justify-end">
                <v-btn
                class="secondary-font text-none mt-8"
                color="primary"
                rounded
                >
                    Lagre samtykker
                </v-btn>
            </div>
        </div>
        <div v-else>
            <v-overlay :value="loading" color="white" absolute style="height: 600px">
                <v-progress-circular
                    color="var(--v-primary-base)"
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
        </div>
    </div>
</template>

<script>
import { TheConsentToggle, ProfileDropdown, TitleAndEdit } from '../../../Common/index'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: { TheConsentToggle, ProfileDropdown, TitleAndEdit },
    props: {
        user: {
            required: true,
            default: '',
            type: Object,
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data() {
        return {
            consents: [],
            loading: false,
            allToggled: false,
            showInfoNewsOffer: false,

            /**
             * Fetch these states from the user's choices
             */
            states: {
                SAME_CHOICE_GLOBALLY: {toggleState: false, nr: 1},
                RECOMMENDATIONS:      {toggleState: false, nr: 2},
                INFO_NEWS_OFFERS:     {toggleState: false, nr: 3},
                MEMBERSHIP_PROGRAM:   {toggleState: false, nr: 4},
                SMS:                  {toggleState: false, nr: 5},
                EMAIL:                {toggleState: false, nr: 6},
                DIGITAL_CHANNELS:     {toggleState: false, nr: 7},
            }
        };
    },
    methods: {
        setState(state) {
            switch (state.nr) {
                case 1:
                    this.states.SAME_CHOICE_GLOBALLY.toggleState = state.toggleState
                    break;
                case 2: 
                    this.states.RECOMMENDATIONS.toggleState = state.toggleState
                    break;
                case 3:
                    this.states.INFO_NEWS_OFFERS.toggleState = state.toggleState
                    this.states.SMS.toggleState = state.toggleState
                    this.states.EMAIL.toggleState = state.toggleState
                    this.states.DIGITAL_CHANNELS.toggleState = state.toggleState
                    break;
                case 4:
                    this.states.MEMBERSHIP_PROGRAM.toggleState = state.toggleState
                    break;
                case 5:
                    this.states.SMS.toggleState = state.toggleState
                    break;
                case 6:
                    this.states.EMAIL.toggleState = state.toggleState
                    break;
                case 7:
                    this.states.DIGITAL_CHANNELS.toggleState = state.toggleState
                    break;
                default: null
            }
        },
    },
    computed: {
        consentsDescription() {
            //Dynamic / Umbraco?
            return this.layout == 'portal' ? '“Happytalk, info and why?” “Din personlige guide til frisør, velværesalonger og klinikker over hele Norge.”' : '“Happytalk, info and why?”'
        },
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        isTpn() {
			return !!this.tpnChainId
		},
		tpnChainId() {
			return parseInt(this.$route.params.chainId || this.$route.query.chainId) || 0;
		},
    },
    async created() {
        profileSvc = await ProfileSvc(this.$axios);
        this.loading = true
        this.consents = await profileSvc.GetUserConsents(this.bookingApi, this.tpnChainId, this.isTpn)
        this.loading = false
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>