<template>
    <div class="profile__container--navigation--list pa-0" >
        <v-hover v-slot="{ hover }">
            <div 
                v-ripple 
                class="d-flex align-center user-info pa-4" 
                :style="activeItem == 'Profil' ? 'transition: background 0.5s; background: var(--v-primary-opacity-12)' : 'cursor: pointer;'" 
                @click="switchComponent('Profil', null)"
            >
                <v-avatar color="primary" size="80px">
                    <v-icon size="80px" color="var(--v-secondary-base)">fxt-user</v-icon>
                </v-avatar>
                <v-list class="pa-0">
                    <v-list-item :style="activeItem == 'Profil' ? 'transition: background 0.5s; background: var(--v-primary-opacity-12);' : ''">
                        <v-list-item-content>
                            <v-list-item-title class="primary-font text-wrap" :style="hover ? 'color: var(--v-primary-base)' : ''"> {{ user.firstName + ' ' + user.lastName }}</v-list-item-title>
                            <v-list-item-subtitle class="primary-font"> {{ user.mobileNumber }} </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </v-hover>
        <v-btn
            class="font-weight-bold secondary-font text-none my-4 mx-4"
            color="primary"
            rounded
            outlined
            style="width:80%"
            v-if="layout == 'chain'"
            @click="redirectToFixitProfile()"
        >
            <div>Vis full profil hos Fixit</div>
            <v-icon class="pl-2 pb-1" size="22">fxt-external-link</v-icon>
        </v-btn>

        <div v-for="(list, i) in lists" :key="i">
            <hr v-if="i != 0" :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            <v-list class="py-0 my-0" v-for="item in list" :key="item.title">
                <v-list-item :input-value="activeItem == item.title" :style="activeItem == item.title ? 'background: var(--v-primary-opacity-12)' : ''" class="profile__container--navigation--list-item" @click="item.title == 'Logg ut' ? $emit('logout') : activeItem != item.title ? switchComponent('', item) : null">
                    <v-list-item-icon class="mr-1" v-if="item.icon">
                        <v-icon size="25px" color="primary">{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="primary-font">{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>

<script>
export default {
    components: { 
        FavouriteEmployees: () => import('../Profile/components/FavouriteEmployees/FavouriteEmployees.vue'),
        FavouriteTreatments: () => import('../Profile/components/FavouriteTreatments//FavouriteTreatments.vue'), 
        FavouriteProducts: () => import('../Profile/components/FavouriteProducts/FavouriteProducts.vue'), 
        TheConsents: () => import('../Profile/components/Consents/TheConsents.vue'), 
        OrderHistory: () => import('../Profile/components/OrderHistory/OrderHistory.vue'), 
        MembershipProgram: () => import('../Profile/components/MembershipProgram/MembershipProgram.vue'), 
        MySalons: () => import('../Profile/components/MySalons/MySalons.vue'), 
        PaymentMethods: () => import('../Profile/components/PaymentMethods/PaymentMethods.vue'),
        Giftcards: () => import('../Profile/components/Giftcards/Giftcards.vue')
    },
    data: function() {
        return {
            lists: [
                [
                    ...(this.layout == 'portal' ? [{title: 'Mine salonger', icon: 'fxt-salon', component: MySalons}] : []),
                    {title: 'Favorittansatte', icon: 'fxt-heart', component: FavouriteEmployees},
                    {title: 'Favorittbehandlinger', icon: 'fxt-heart', component: FavouriteTreatments},
                    {title: 'Favorittprodukter', icon: 'fxt-heart', component: FavouriteProducts},
                    {title: 'Bestillingshistorikk', icon: 'fxt-cart', component: OrderHistory},
                    ...(this.layout == 'portal' ? [{title: 'Gavekort', icon: 'fxt-gift', component: Giftcards}] : []),
                    ...(this.layout == 'portal' ? [{title: 'Betalingsmetoder', icon: 'fxt-credit-card-checked', component: PaymentMethods}] : []),
                ],
                [
                    {title: 'Fordelsprogram', icon: '', path: '', component: MembershipProgram},
                    {title: 'Personvern og samtykker', icon: '', path: '', component: TheConsents}
                ],
                [
                    {title: 'Logg ut', icon: '', path: ''}
                ]
            ]
        }
    },
    props: {
        user: {
            type: Object,
            required: true,
            default: null,
        },
        activeItem: {},
        layout: {
            required: false,
            default: 'chain',
            type: String
        },
        isProfile: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    methods: {
        switchComponent(path, item) {
            if (this.layout == 'chain') {
                this.$router.replace({query: { title: item ? item.title.toLowerCase().replaceAll(' ', '-') : path.toLowerCase().replaceAll(' ', '-') }})
            } else {
                this.isProfile ? this.$router.replace({name: item ? item.title : path }) : window.open(`${process.env.VUE_APP_FIXIT_PROFILE_URL}/${item ? this.toUrlSafe(item.title) : this.toUrlSafe(path)}`, '_blank')
            }
        },
        toUrlSafe(string) {
            return string.toLowerCase().replaceAll(' ', '-').replaceAll('å', 'aa')
        },
        redirectToFixitProfile() {
            //TODO: Able to redirect to nested pages too. Waiting for fetch by id methods to be able to load these pages.
            window.open(`${this.$config.VUE_APP_FIXIT_PROFILE_URL}/${this.activeItem.toLowerCase()}`, '_blank') 
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/styles/profile.scss";
</style>
