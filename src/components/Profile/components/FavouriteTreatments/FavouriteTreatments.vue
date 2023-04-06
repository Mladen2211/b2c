<template>
    <div style="position: relative">
        <title-and-edit currentViewTitle="Favorittbehandlinger" @toggleEdit="toggleEdit" @confirmAction="save" :edit="edit" :hideEditButton="!treatments.length" :layout="layout"/>
        <div class="profile__container--content__treatment primary-font pt-5">
            <div v-if="treatments.length">
                <profile-dropdown v-if="layout == 'portal'" :items="['HairSalon', 'SkinSalon', 'NailSalon']" label="Velg salong"></profile-dropdown>
                <div v-for="treatment in treatments" :key="treatment.title">
                    <treatment :treatment="treatment" :edit="edit" @close-profile="$emit('close-profile')"></treatment>
                </div>
                <div class="d-flex justify-end">
                    <!-- TODO: Only show if a salon is selected -->
                    <v-btn
                        class="font-weight-bold secondary-font text-none my-6"
                        color="primary"
                        rounded
                        outlined
                    >
                        <div>Finn flere i behandlinger</div>
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
                <no-content v-if="!loading && !treatments.length" title="Du har ingen favorittbehandlinger ennå." icon="fxt-dispenser" buttonText="Finn behandling"/>
            </div>
        </div>
    </div>
</template>

<script>
import Treatment from './components/Treatment.vue'
import { ProfileDropdown, NoContent, TitleAndEdit } from '../../../Common/index'
export default {
    components: { Treatment, ProfileDropdown, NoContent, TitleAndEdit },
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        edit: false,
        loading: false,
        treatments: [],
    }),
    computed: {
        // bookingApi() {
        //     return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        // }
    },
    methods: {
        save() {
            
        },
        toggleEdit() {
            this.edit = !this.edit
        }
    },
}
</script>