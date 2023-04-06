<template>
    <div v-if="programWithHistory != null" class="profile__container--content__membershipProgram--info-page text-center">
        <div class="profile__container--content__membershipProgram--info-page__title">
            Du har <br>
            <span class="profile__container--content__membershipProgram--info-page__title--points">{{program.pointsEarned}}</span> <br>
            poeng
        </div>
        <div class="d-flex justify-center my-14">
            <animated-icon size="174" icon="fxt-user-group" iconColor="primary" backgroundColor="var(--v-primary-opacity-12)"></animated-icon>
        </div>
        <div class="profile__container--content__membershipProgram--info-page__description mb-5">
            <span v-html="this.program.programDescription"></span>
        </div>
        <div class="d-flex flex-column justify-center align-center">
            <v-btn
                class="font-weight-bold secondary-font text-none my-2"
                color="primary"
                rounded
                style="width:50%"
                @click="switchComponent('Poenghistorikk')"
            >
                Vis poenghistorikk
            </v-btn>
            <v-btn
                class="font-weight-bold secondary-font text-none my-2"
                color="primary"
                rounded
                outlined
                style="width:50%"
                @click="switchComponent('Vilkår for bruk')"
            >
                Vilkår for bruk
            </v-btn>
            <v-btn
                class="font-weight-bold secondary-font text-none my-2"
                color="primary"
                text
                rounded
                style="width:50%"
                @click="showDialog = true"
            >
                Meld meg ut
            </v-btn>
        </div>
        <common-dialog 
            v-if="showDialog" 
            :show="showDialog" 
            :title="`Vil du melde deg ut av ${program.programName}?`" 
            icon="fxt-warning" 
            buttonTextConfirm="Meld meg ut" 
            @closeDialog="showDialog = false"
            @confirmAction="leaveProgram()"
            :layout="layout"
        >
            <p>Du vil ikke opptjene poeng lengre, men du mister ikke poengene du allerede har opptjent. Hvis du melder deg inn igjen vil du få tilbake poengene du har til en hver tid.</p>
        </common-dialog>
    </div>
</template>

<script>
import { CommonDialog, AnimatedIcon } from '../../../../Common/index'
import ProfileSvc from '../../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: {AnimatedIcon, CommonDialog},
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        showDialog: false,
        programWithHistory: null
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        program() {
            return this.programWithHistory.program
        }
    },
    methods: {
        switchComponent(route) {
            if (this.layout == 'chain') {
                this.$router.replace({query: { title: this.toUrlSafe(route), id: this.program.customerProgramId}, params: {program: this.program}})
            } else {
                this.$router.replace({name: route, params: {id: this.program.customerProgramId, program: this.program}})
            }
        },
        toUrlSafe(string) {
            return string.toLowerCase().replaceAll(' ', '-').replaceAll('å', 'aa')
        },
        getCustomerCategoryId() {
            return this.program.customerCategories.length 
            ? this.program.customerCategories.find(x => x.customerProgramId == this.program.customerProgramId).customerCategoryId 
            : this.program.customerCategories[0].customerCategoryId 
            || null
        },
        async leaveProgram() {
            this.$emit('toggle-loading')
            var result = await profileSvc.AddOrRemoveCustomerProgram(this.bookingApi, {
                registerCustomerInCustomerProgram: false,
                customerCategoryId: this.getCustomerCategoryId() != null ? this.getCustomerCategoryId() : this.program.defaultCustomerCategoryId,
                chainId: this.program.chainId,
                siteId: this.program.chain.defaultSiteId,
            })
            if (result) {
                if (this.layout == 'portal') {
                    this.$router.replace({name: 'Bli med i fordelsprogram', params: {id: this.program.customerProgramId, program: this.program}}) 
                } else {
                    this.$emit('refresh')
                }
            }
            this.showDialog = false
            this.$emit('toggle-loading')
        }
    },
    async created() {
        //TODO: Remove prop and rely on fetch by id (Figure out how to handle on salon side)
        profileSvc = await ProfileSvc(this.$axios);
        if (this.layout == 'portal') this.programWithHistory = await profileSvc.GetCustomerProgramById(this.bookingApi, this.$route.params.id)
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>