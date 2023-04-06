<template>
    <div v-if="fetchedProgram != null" class="profile__container--content__membershipProgram--info-page text-center">
        <div class="profile__container--content__membershipProgram--info-page__title">
            {{program.programName}} <br>
        </div>
        <div class="d-flex justify-center my-14">
            <animated-icon size="174" icon="fxt-user-group" iconColor="primary" backgroundColor="var(--v-primary-opacity-12)"></animated-icon>
        </div>
        <div class="profile__container--content__membershipProgram--info-page__description">
            <p><span v-html="program.joinDescription"></span></p>
        </div>

        <!-- <div class="d-flex justify-space-between align-center">
            <span class="font-weight-medium">Send meg oppdateringer og nyheter om fordelsprogrammet</span>
            <v-switch
                color="primary"
            ></v-switch>
        </div> -->
        
        <div class="d-flex flex-column justify-center align-center">
            <v-btn
                class="font-weight-bold secondary-font text-none my-2"
                color="primary"
                rounded
                style="width:50%"
                @click="joinProgram()"
            >
                Bli medlem
            </v-btn>
            <v-btn
                class="font-weight-bold secondary-font text-none my-2"
                color="primary"
                rounded
                outlined
                style="width:50%"
                @click="switchComponent()"
            >
                Vilkår for bruk
            </v-btn>
        </div>
    </div>
</template>

<script>
import { TheConsentToggle, AnimatedIcon } from '../../../../Common/index'
import ProfileSvc from '../../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: { AnimatedIcon, TheConsentToggle },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        loading: false,
        fetchedProgram: null
    }),

    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        program() {
            return this.fetchedProgram.program
        }
    },
    methods: {
        switchComponent() {
            if (this.layout == 'chain') {
                this.$router.replace({query: {title: 'vilkaar-for-bruk', id: this.program.customerProgramId}, params: {program: this.program}})
            } else {
                this.$router.replace({name: 'Vilkår for bruk', params: {id: this.program.customerProgramId, program: this.program}})
            }
        },
        getCustomerCategoryId() {
            return this.program.customerCategories.length 
            ? this.program.customerCategories.find(x => x.customerProgramId == this.program.customerProgramId).customerCategoryId 
            : this.program.customerCategories[0].customerCategoryId 
            || null
        },
        async joinProgram() {
            this.$emit('toggle-loading');
            var result = await profileSvc.AddOrRemoveCustomerProgram(this.bookingApi, {
                registerCustomerInCustomerProgram: true,
                customerCategoryId: this.getCustomerCategoryId() != null ? this.getCustomerCategoryId() : this.program.defaultCustomerCategoryId,
                chainId: this.program.chainId,
                siteId: this.program.chain.defaultSiteId,
            })
            if (result) {
                if (this.layout == 'portal') {
                    this.$router.replace({name: 'Info fordelsprogram', params: {id: this.program.customerProgramId, program: this.program}}) 
                } else {
                    this.$emit('refresh')
                }
            }
            this.$emit('toggle-loading');
        }
    },
    async created() {
        profileSvc = await ProfileSvc(this.$axios);
        if (this.layout == 'portal') this.fetchedProgram = await profileSvc.GetCustomerProgramById(this.bookingApi, this.$route.params.id)
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>