<template>
    <div v-if="fetchedProgram != null" class="profile__container--content__membershipProgram">
        <div 
            class="d-flex justify-space-between align-center py-2 px-4" 
            :class="`profile__container--content__membershipProgram--${layout == 'portal' ? 'portal-header' : 'header'}`"
        >
            <div>
                <p class="font-weight-bold mb-0 py-2">Poengsaldo</p>
            </div>
            <div class="d-flex">
                <p style="color: var(--v-primary-text)" class="profile__container--content__membershipProgram--points font-weight-bold mb-0">{{program.pointsEarned}} p</p>
            </div>
        </div>
        <div v-for="(historyItem, i) in history" :key="i">
            <v-hover v-slot="{ hover }">
                <div 
                    class="d-flex justify-space-between align-center py-2 px-4" 
                    :style="hover ? 'background-color: var(--v-primary-opacity-12); cursor: pointer;' : ''"
                    @click="switchComponent(historyItem)"
                >
                    <div>
                        <p class="font-weight-bold mb-0 py-2">{{historyItem.orderDate}}<span class="font-weight-regular text--secondary"> {{daysSinceOrder(historyItem.orderDate)}}</span></p>
                    </div>
                    <div class="d-flex">
                        <p class="profile__container--content__membershipProgram--points mb-0 pr-2">{{historyItem.pointsChange > 0 ? '+' + historyItem.pointsChange : historyItem.pointsChange}} p</p>
                        <v-icon color="primary">fxt-calendar-check</v-icon>
                    </div>
                </div>
            </v-hover>
            <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
        </div>
    </div>
</template>

<script>
import ProfileSvc from '../../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: {  },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    
    data: () => ({
        fetchedProgram: null
    }),
    computed: {
        history() {
            return this.fetchedProgram.history
        },
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        program() {
            return this.fetchedProgram.program
        }
    },
    methods: {
        daysSinceOrder(date) {
            //TODO: Calculate amount of days since order
            
            return '(' + '66' + ' dager siden)'
        },
        switchComponent(item) {
            if (this.layout == 'chain') {
                this.$router.replace({query: { title: 'ordredetaljer', orderId: item.order.orderId}, params: {order: item.order}})
            } else {
                this.$router.replace({name: 'PoengOrdredetaljer', params: {id: this.program.customerProgramId, orderId: item.order.orderId, order: item.order}})
            }
        },
    },
    async created() {
        //TODO: Remove prop and rely on fetch by id (Figure out how to handle on salon side)
        profileSvc = await ProfileSvc(this.$axios);
        this.fetchedProgram = await profileSvc.GetCustomerProgramById(this.bookingApi, this.layout == 'portal' ? this.$route.params.id : this.$route.query.id)
    },
    beforeDestroy() {
        profileSvc = null
    }
}
</script>