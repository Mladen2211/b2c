<template>
    <div style="position: relative">
        <title-and-edit currentViewTitle="Mine salonger" @toggleEdit="toggleEdit" :edit="edit" :hideEditButton="!salons.length" :layout="layout"/>
        <div class="profile__container--content__mysalons primary-font pt-5">
            <div v-if="salons.length">
                <div v-for="salon in allSalons" :key="salon.title">
                    <salon :salon="salon" :edit="edit" :layout="layout" @delete-salon="updateSalon"></salon>
                </div>
                <div class="d-flex justify-end">
                    <v-btn
                        class="font-weight-bold secondary-font text-none my-6"
                        color="primary"
                        rounded
                        outlined
                    >
                        <div>Søk etter flere</div>
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
                <no-content v-if="!loading && !salons.length" title="Du har ingen favorittsalonger ennå." icon="fxt-salon" buttonText="Finn din salong"/>
            </div>
        </div>
    </div>
</template>

<script>
import Salon from './components/Salon.vue'
import SalonModel from '../../../../models/Salon'
import { NoContent, TitleAndEdit } from '../../../Common/index'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;

export default {
    components: { Salon, NoContent, TitleAndEdit },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        edit: false,
        salons: [],
        loading: false
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        allSalons() {
            var all = []
            for (const chain of this.salons) {
                all = all.concat(chain.chainSites.map(x => new SalonModel(x)))
            }
            return all
        }
    },
    methods: {
        async updateSalon(siteId) {
            this.loading = true;
            var result = await profileSvc.UpdateMySalons(this.bookingApi, siteId.toString(), '0')
            if (result ) {
                this.salons = await profileSvc.GetMySalons(this.bookingApi, 0, '0', false) 
            }
            this.loading = false
        },
        toggleEdit() {
            this.edit = !this.edit
        }
    },
    async created() {
		profileSvc = await ProfileSvc(this.$axios);
        this.loading = true;
        this.salons = await profileSvc.GetMySalons(this.bookingApi, 0, '0', false) 
        this.loading = false;
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>