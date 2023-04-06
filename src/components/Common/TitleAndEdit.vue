<template>
    <div class="profile__container--content__title primary-font">
        <span v-if="!hideTitle">{{ currentViewTitle }}</span>
        <div v-if="!hideEditButton">
            <v-btn class="mx-2" elevation="0" fab small :color="edit ? 'var(--v-primary-base)' : 'white'"
                :style="edit && !onlyToggle ? 'display: none' : ''"
                v-if="!hideTitle && (isEditableChain || isEditablePortal)">
                <v-icon :color="edit ? 'var(--v-primary-text-base)' : 'primary'" @click="$emit('toggleEdit')">fxt-pen
                </v-icon>
            </v-btn>
            <v-btn class="mx-2 text-none" elevation="0" rounded text color="primary"
                v-if="!hideTitle && (isEditableChain || isEditablePortal) && edit && !onlyToggle"
                @click="$emit('toggleEdit')">
                Avbryt
            </v-btn>
            <v-btn class="mx-2 text-none" elevation="0" rounded :disabled="!hasEdited" color="primary"
                v-if="!hideTitle && (isEditableChain || isEditablePortal) && edit && !onlyToggle"
                @click="$emit('confirmAction')">
                Lagre
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentViewTitle: {
            required: true,
            type: String
        },
        edit: {
            required: false,
            default: false,
            type: Boolean
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        },
        hideEditButton: {
            required: false,
            default: false,
            type: Boolean
        },
        hasEdited: {
            required: false,
            default: false,
            type: Boolean
        },
        onlyToggle: {
            required: false,
            default: true,
            type: Boolean
        }
    },
    computed: {
        hideTitle() {
            return ['Ordredetaljer', 'Info fordelsprogram', 'Bli med i fordelsprogram', 'Poenghistorikk', 'Vilkår for bruk'].includes(this.currentViewTitle) || (this.layout == 'chain' && this.currentViewTitle == 'Fordelsprogram' || this.currentViewTitle == 'Bli med i fordelsprogram')
        },
        isEditableChain() {
            return ['Favorittansatte', 'Favorittbehandlinger', 'Favorittprodukter'].includes(this.currentViewTitle)
        },
        isEditablePortal() {
            return this.editableChain || ['Profil', 'Mine salonger'].includes(this.currentViewTitle) && this.layout == 'portal'
        }
    }
}
</script>

<style scoped>
</style>