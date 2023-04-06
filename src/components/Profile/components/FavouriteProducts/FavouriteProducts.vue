<template>
    <div style="position: relative">
        <title-and-edit currentViewTitle="Favorittprodukter" @toggleEdit="toggleEdit" :edit="edit" :hideEditButton="!products.length" :layout="layout"/>
        <div class="profile__container--content__product primary-font pt-5">
            <div v-if="products.length">
                <profile-dropdown v-if="layout == 'portal'" :items="['HairSalon', 'SkinSalon', 'NailSalon']" label="Velg salong"></profile-dropdown>
                <div v-for="product in products" :key="product.title">
                    <product :product="product" :edit="edit" @delete-product="updateProducts"></product>
                </div>
                <div class="d-flex justify-end">
                    <!-- TODO: Only show if a salon is selected -->
                    <v-btn
                        class="font-weight-bold secondary-font text-none my-6"
                        color="primary"
                        rounded
                        outlined
                    >
                        <div>Finn flere i nettbutikk</div>
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
                <no-content v-if="!loading && !products.length" title="Du har ingen favorittprodukter ennå." icon="fxt-heart" buttonText="Gå til nettbutikken"/>
            </div>
        </div>
    </div>
</template>

<script>
import Product from './components/Product.vue'
import { ProfileDropdown, NoContent, TitleAndEdit } from '../../../Common/index'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;
export default {
    components: { Product, ProfileDropdown, NoContent, TitleAndEdit },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        },
    },
    data: () => ({
        edit: false,
        loading: false,
        products: []
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        }
    },
    methods: {
        async updateProducts(productId) {
            var result = await profileSvc.UpdateFavoriteProduct(this.bookingApi, productId)
            if (result) {
                this.products = await profileSvc.GetFavoriteProducts(this.bookingApi)
            }
        },
        toggleEdit() {
            this.edit = !this.edit
        }
    },
    async created() {
        profileSvc = await ProfileSvc(this.$axios);
        this.loading = true
        this.products = await profileSvc.GetFavoriteProducts(this.bookingApi)
        this.loading = false
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>