<template>
    <div style="position: relative">
        <title-and-edit currentViewTitle="Bestillingshistorikk" :layout="layout"/>
        <div class="profile__container--content__orderhistory primary-font pt-5">
            <div v-if="orders.length">
                <profile-dropdown v-if="layout == 'portal'" :items="['HairSalon', 'SkinSalon', 'NailSalon']" label="Velg salong"></profile-dropdown>
                <div v-for="order in orders" :key="order.title">
                    <order @showOrderDetails="order => switchComponent(order)" :order="order" :layout="layout"></order>
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
                <no-content v-if="!loading && !orders.length" title="Du har ikke bestilt noe ennå." icon="fxt-calendar" buttonText="Bestill time"/>
            </div>
        </div>
    </div>
</template>

<script>
import Order from './components/Order.vue'
import { ProfileDropdown, NoContent, TitleAndEdit } from '../../../Common/index'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: { Order, ProfileDropdown, NoContent, TitleAndEdit },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        temp: [],
        loading: false,
        orders: []
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        }
    },
    methods: {
        switchComponent(order) {
            if (this.layout == 'chain') {
                this.$router.replace({query: { title: 'ordredetaljer', orderId: order.orderId }, params: {order: order}})
            } else {
                this.$router.replace({name: 'Ordredetaljer', params: {id: order.orderId, order: order}})
            }
        }
    },
    async created() {
		profileSvc = await ProfileSvc(this.$axios);
        this.loading = true;
        this.orders = await profileSvc.GetUserAppointments(this.bookingApi) 
        this.loading = false;
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>