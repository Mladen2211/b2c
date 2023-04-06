<template>
<v-layout row justify-center>
    <v-dialog
      v-bind="show"
      fullscreen
      class="profile"
    >
        <v-sheet style="padding-top: 60px; min-height: 100%">
            <div class="profile__container primary-font">
                <v-row :justify="hideNavigation ? 'center' : 'space-between'">
                    <v-col cols="12" class="profile__container--breadcrumbs my-5">
                        <breadcrumbs :breadcrumbs="breadcrumbs" :layout="layout" @close-profile="$emit('close-profile')"></breadcrumbs>
                    </v-col>
                    <transition mode="out-in" name="fade-transition">
                        <v-col cols="6" md="6" lg="4" v-if="$vuetify.breakpoint.mdAndUp && !hideNavigation" class="profile__container--navigation">
                            <user-menu :activeItem="currentViewTitle" :user="user" :layout="layout" @logout="$emit('logout')" :isProfile="isProfile"></user-menu>
                        </v-col>
                    </transition>
                    <v-col cols="12" sm="12" md="6" lg="8" class="profile__container--content" :class="!hideNavigation ? 'pl-10 pt-10' : 'pt-5'">
                        <transition mode="out-in" name="fade-transition">
                            <component v-bind:is="currentView" v-bind="currentProps" @close-profile="$emit('close-profile')" @update-employees="$emit('update-employees')"/>
                        </transition>
                    </v-col>
                </v-row>
            </div>
        </v-sheet>
    </v-dialog>
</v-layout>
</template>
<script>
import { 
    Breadcrumbs, 
    UserProfile, 
    OrderDetails, 
    ProgramInfo, 
    PointsHistory, 
    TermsForUse, 
    FavouriteEmployees, 
    FavouriteTreatments, 
    FavouriteProducts, 
    TheConsents, 
    OrderHistory, 
    MembershipProgram,
    MySalons,
    JoinProgram,
    Giftcards,
    PaymentMethods
} from "./components/index";

import { UserMenu } from '../Common/index'
  export default {
    components: { 
        Breadcrumbs, 
        UserProfile, 
        UserMenu, 
        OrderDetails, 
        ProgramInfo, 
        PointsHistory, 
        TermsForUse, 
        FavouriteEmployees, 
        FavouriteTreatments, 
        FavouriteProducts, 
        TheConsents, 
        OrderHistory, 
        MembershipProgram,
        MySalons,
        JoinProgram,
        Giftcards,
        PaymentMethods
    },
    data: function() {
        return {
            currentView: UserProfile,
            currentViewTitle: 'Profil',
            previousViewTitle: '',
            order: null,
            program: null,
        }
    },
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false,
        },
        user: {
            type: Object,
            required: true,
            default: null
        },
        layout: {
            required: true,
            default: 'chain',
            type: String
        },
        isProfile: {
            required: false,
            default: false,
            type: Boolean
        },
        useAxios: Boolean,
    },
    computed: {
        currentProps() {
            switch (this.currentViewTitle) {
                case 'Profil':                   return { user: this.user, layout: this.layout }
                case 'Mine salonger':            return { layout: this.layout }
                case 'Favorittansatte':          return { layout: this.layout }
                case 'Favorittbehandlinger':     return { layout: this.layout }
                case 'Favorittprodukter':        return { layout: this.layout }
                case 'Personvern og samtykker':  return { user: this.user, layout: this.layout }
                case 'Bestillingshistorikk':     return { layout: this.layout }
                case 'Ordredetaljer':            return { order: this.order, layout: this.layout }
                case 'Fordelsprogram':           return { layout: this.layout }
                case 'Info fordelsprogram':      return { program: this.program, layout: this.layout }
                case 'Poenghistorikk':           return { program: this.program, layout: this.layout }
                case 'Vilkår for bruk':          return { program: this.program, layout: this.layout }
                case 'Bli med i fordelsprogram': return { program: this.program, layout: this.layout }
                case 'Betalingsmetoder':         return { user: this.user, layout: this.layout }
                case 'Gavekort':                 return {}
            }
        },
        pages() {
			return [
                    {title: 'Mine salonger', icon: 'fxt-salon', path: 'mine-salonger', component: MySalons},
                    {title: 'Favorittansatte', icon: 'fxt-heart', path: 'favorittansatte', component: FavouriteEmployees},
                    {title: 'Favorittbehandlinger', icon: 'fxt-heart', path: 'favorittbehandlinger', component: FavouriteTreatments},
                    {title: 'Favorittprodukter', icon: 'fxt-heart', path: 'favorittprodukter', component: FavouriteProducts},
                    {title: 'Bestillingshistorikk', icon: 'fxt-cart', path: 'bestillingshistorikk', component: OrderHistory},
                    {title: 'Gavekort', icon: 'fxt-gift', path: 'gavekort', component: Giftcards},
                    {title: 'Betalingsmetoder', icon: 'fxt-credit-card-checked', path: 'betalingsmetoder', component: PaymentMethods},
                    {title: 'Fordelsprogram', icon: '', path: 'fordelsprogram', component: MembershipProgram},
                    {title: 'Personvern og samtykker', icon: '', path: 'personvern-og-samtykker', component: TheConsents},
					{title: 'Profil', icon: '', path: 'profil', component: UserProfile},
					{title: 'Ordredetaljer', icon: '', path: 'ordredetaljer', component: OrderDetails},
					{title: 'Info fordelsprogram', icon: '', path: 'info-fordelsprogram', component: ProgramInfo},
					{title: 'Bli med i fordelsprogram', icon: '', path: 'bli-med-i-fordelsprogram', component: JoinProgram},
					{title: 'Poenghistorikk', icon: '', path: 'poenghistorikk', component: PointsHistory},
					{title: 'Vilkår for bruk', icon: '', path: 'vilkaar-for-bruk', component: TermsForUse},
            ]
		},
        breadcrumbs() {
            var baseCrumbs = [
                {name: this.layout == 'portal' ? 'Fixit' : 'Hjem', disabled: false},
                {name: 'Mine sider', disabled: false},
            ]
            switch(this.currentViewTitle) {
                case ('Ordredetaljer'):
                    if (this.previousViewTitle == 'Poenghistorikk') {
                        return baseCrumbs.concat([
                            {name: 'Fordelsprogram', disabled: false, component: MembershipProgram},
                            {name: 'Poenghistorikk', id: this.program.customerProgramId, program: this.program, disabled: false, component: PointsHistory},
                            {name: this.order.orderDate, disabled: true}
                        ])
                    } else {
                        return baseCrumbs.concat([
                            {name: 'Bestillingshistorikk', disabled: false, component: OrderHistory},
                            {name: this.order.orderDate,  disabled: true}
                        ])
                    }
                case ('Info fordelsprogram'):
                    return baseCrumbs.concat([
                        {name: 'Fordelsprogram', disabled: false, component: MembershipProgram},
                        {name: this.program.programName, disabled: true}
                    ])
                case ('Bli med i fordelsprogram'):
                    return baseCrumbs.concat([
                        {name: 'Fordelsprogram', disabled: false, component: MembershipProgram},
                        {name: this.program.programName, disabled: true}
                    ])
                case ('Poenghistorikk'):
                    return baseCrumbs.concat([
                        {name: 'Fordelsprogram', component: MembershipProgram},
                        {name: this.currentViewTitle, disabled: true}
                    ])
                case ('Vilkår for bruk'):
                    return baseCrumbs.concat([
                        {name: 'Fordelsprogram', disabled: false, component: MembershipProgram},
                        {name: this.currentViewTitle, disabled: true}
                    ])
                default: 
                    return baseCrumbs.concat([{name: this.currentViewTitle, disabled: true}])
            }
        },
        hideNavigation() {
            return ['Ordredetaljer', 'Info fordelsprogram', 'Bli med i fordelsprogram', 'Poenghistorikk', 'Vilkår for bruk'].includes(this.currentViewTitle)
        },
    },
    methods: {
        setComponent(route) {
            var page = this.pages.find(x => x.path == route.query.title);
            if (page != null) {
                this.previousViewTitle = this.currentViewTitle
                this.currentView = page.component
                this.currentViewTitle = page.title
                if (route.params.order) {
                    this.order = route.params.order
                }
                if (route.params.program) {
                    this.program = route.params.program
                }
            }
        }
    },
    watch: {
        $route (to){
			this.setComponent(to)
        },
    },
    mounted() {
        this.setComponent(this.$route)
    },
    beforeCreate() {
        document.getElementsByTagName("body")[0].className="noscroll";
        document.getElementsByTagName("body")[0].className="removeBodyScrollWidth";
    },
    beforeDestroy() {
        document.body.removeAttribute("class","noscroll");
        document.body.removeAttribute("class","removeBodyScroll");
    },
  }
</script>

<style lang="scss">
@import "../../assets/styles/profile.scss";
</style>