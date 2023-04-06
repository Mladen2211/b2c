<template>
    <div class="profile-dropdown">
        <v-select :style="$vuetify.breakpoint.mdAndUp ? 'width: 50%' : 'width: 80%'" :items="items" :label="label"
            single-line item-color="primary" :append-icon="'fxt-chevron-down'">
            <template v-slot:selection="{ item }">
                <span class="profile-dropdown__selected">{{ item }}</span>
            </template>
        </v-select>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            required: true,
            default: [],
            type: Array
        },
        label: {
            required: false,
            default: 'Velg',
            type: String
        }
    }
}
</script>

<style lang="scss">
.profile-dropdown {
    &__selected {
        color: var(--v-primary-base);
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
    }
}
</style>
