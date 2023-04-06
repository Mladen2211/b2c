<template>
<div style="position: relative">
    <title-and-edit currentViewTitle="Fordelsprogram" :layout="layout"/>
    <div v-if="programs.length">
        <div v-if="layout == 'portal'" class="profile__container--content__membershipProgram pt-5">
            <div v-for="membershipProgram in programs" :key="membershipProgram.programName">
                <v-hover v-slot="{ hover }">
                    <div 
                        class="d-flex justify-space-between align-center py-2 px-4" 
                        :style="hover ? 'background-color: var(--v-primary-opacity-12); cursor: pointer;' : membershipProgram.isMember ? '' : 'color: var(--v-primary-opacity-60)'"
                        @click="switchComponent(membershipProgram)"
                    >
                        <div>
                            <p class="font-weight-bold mb-0">{{membershipProgram.programName}}<span class="font-weight-regular" :class="membershipProgram.isMember ? 'text--secondary' : ''"> {{membershipProgram.isMember ? '(siden ' + membershipProgram.joinedDate + ')' : '(Ikke medlem)'}}</span></p>
                            <p class="mb-0">{{membershipProgram.chain.name}}</p>
                        </div>
                        <div>
                            <p v-if="membershipProgram.isMember" class="profile__container--content__membershipProgram--points mb-0 pr-4">{{membershipProgram.pointsEarned}} p</p>
                            <v-btn
                            v-else
                            text
                            color="primary"
                            style="font-size: 20px;"
                            class="text-none font-weight-regular"
                            >
                                Les mer
                            </v-btn>
                        </div>
                    </div>
                </v-hover>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            </div>
        </div>
        <div v-else>
            <transition v-show="!loading" mode="out-in" name="fade-transition">
                <program-info v-if="programs.length && programs[0].isMember" :program="programs[0]" :layout="layout" @refresh="refresh" @toggle-loading="loading = !loading"></program-info>
                <join-program v-else-if="programs.length && !programs[0].isMember" :program="programs[0]" :layout="layout" @refresh="refresh" @toggle-loading="loading = !loading"></join-program>
            </transition>
            <div v-if="loading">
                <v-overlay :value="loading" color="white" absolute style="height: 600px">
                    <v-progress-circular
                        color="var(--v-primary-base)"
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-overlay>
            </div>
        </div>
    </div>
    <v-overlay :value="!programs.length" color="white" absolute style="height: 600px">
        <v-progress-circular
            color="var(--v-primary-base)"
            indeterminate
            size="64"
        ></v-progress-circular>
    </v-overlay>

</div>
</template>

<script>
import { TitleAndEdit } from '../../../Common/index'
import JoinProgram from '../MembershipProgram/components/JoinProgram.vue'
import ProgramInfo from '../MembershipProgram/components/ProgramInfo.vue'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: { ProgramInfo, JoinProgram, TitleAndEdit },
    props: {
        layout: {
            required: true,
            default: 'chain',
            type: String
        },
    },
    data: () => ({
        programs: [],
        loading: false,
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        }
    },
    methods: {
       switchComponent(program) {
            if (this.layout == 'chain') {
                program.isMember 
                ? this.$router.replace({query: {id: program.customerProgramId, title: 'info-fordelsprogram' }, params: {program: program}}) 
                : this.$router.replace({query: {id: program.customerProgramId, title: 'bli-med-i-fordelsprogram' }, params: {program: program}})
            } else {
                program.isMember 
                ? this.$router.replace({name: 'Info fordelsprogram', params: {id: program.customerProgramId, program: program}}) 
                : this.$router.replace({name: 'Bli med i fordelsprogram', params: {id: program.customerProgramId, program: program}})
            }
        },
        async refresh() {
            //this.programs = await profileSvc.GetCustomerPrograms(this.bookingApi, this.$store.getters["cmsConfigHomepage/getChainId"])
            this.programs = await profileSvc.GetCustomerPrograms(this.bookingApi, 36)
        }
    },
    async created() {
		profileSvc = await ProfileSvc(this.$axios);
        //TODO: Fetch by cmsconfig chainId if on salon. If on portal, fetch programs for all salons in 'my salons' list
        //this.programs = await profileSvc.GetCustomerPrograms(this.bookingApi, this.$store.getters["cmsConfigHomepage/getChainId"])
        this.programs = await profileSvc.GetCustomerPrograms(this.bookingApi, 36)
    },
    beforeDestroy() {
		profileSvc = null
	}
}
</script>