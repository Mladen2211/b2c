<template>
    <div>
        <div 
        class="d-flex justify-space-between align-center px-3 my-2" 
        :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 44px' : 'max-height: 75px'" 
        @click="showComponent = !showComponent" style="cursor: pointer">
            <div>
                <v-icon color="primary" size="28" class="pr-2 pb-1">{{arrowIcon}}</v-icon><span class="font-weight-bold">{{ title }}</span>
            </div>
            <img :src="icon">
        </div>
        <v-expand-transition>
            <div v-if="showComponent">
                <slot>Ingen innhold</slot>
            </div>
        </v-expand-transition>
    </div>
</template>
<script>
export default {
    name: "the-consent-toggle-item",
    data: () => ({
        showComponent: false,
    }),
    props: {
        title: {
            required: true,
            default: ''
        },
        icon: {
            required: false,
            default: ''
        },
    },
    computed: {
        arrowIcon() {
            return this.showComponent ? 'fxt-chevron-up' : 'fxt-chevron-down'
        }
    }
};
</script>
