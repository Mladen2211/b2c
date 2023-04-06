<template>
    <div style="position: relative">
        <title-and-edit 
            currentViewTitle="Favorittansatte" 
            @toggleEdit="toggleEdit" 
            @confirmAction="save" 
            :edit="edit" 
            :layout="layout"
            :hideEditButton="employees.length == 0"
        />
        <div class="profile__container--content__employee primary-font pt-5">
            <div v-if="employees.length">
                <profile-dropdown v-if="layout == 'portal'" :items="['HairSalon', 'SkinSalon', 'NailSalon']" label="Velg salong"></profile-dropdown>
                <div v-for="emp in employees" :key="emp.name">
                    <employee :employee="emp" :edit="edit" @close-profile="$emit('close-profile')" @delete-employee="save"></employee>
                </div>
                <div class="d-flex justify-end">
                    <!-- TODO: Only show if a salon is selected -->
                    <v-btn
                        class="font-weight-bold secondary-font text-none my-6"
                        color="primary"
                        rounded
                        outlined
                    >
                        <div>Finn flere i om oss</div>
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
                <no-content v-if="!loading && !employees.length" title="Du har ingen favorittansatte ennå." icon="fxt-user-square" buttonText="Finn ansatte i om oss" :redirectUrl="redirectUrl"/>
            </div>
        </div>
    </div>
</template>

<script>
import Employee from './components/Employee.vue'
import { ProfileDropdown, NoContent, TitleAndEdit } from '../../../Common/index'
import ProfileSvc from '../../../../services/profile-svc';
let profileSvc = null;
export default {
    name: 'favorite-employee',
    components: { Employee, ProfileDropdown, NoContent, TitleAndEdit },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        },
    },
    data: () => ({
        edit: false,
        employees: [],
        loading: false,
        clickedEmployee: null
    }),
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        redirectUrl() {
            //TODO: Implement redirect to salon about us and fixit context for same thing
            return this.layout == 'portal' ? '' : ''
        }
    },
    methods: {
        async save(emp) {
            await profileSvc.UpdateFavoriteEmployee(this.bookingApi, emp)
            this.$emit('update-employees')
            this.employees = await profileSvc.GetFavoriteEmployees(this.bookingApi)
         },
        toggleEdit() {
            this.edit = !this.edit
        },
    },
    async created() {
		profileSvc = await ProfileSvc(this.$axios);
        this.loading = true;
        this.employees = await profileSvc.GetFavoriteEmployees(this.bookingApi)
        this.loading = false;
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>