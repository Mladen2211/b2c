<template>
    <div class="d-flex justify-space-between align-center"
        :style="$vuetify.breakpoint.mdAndUp ? 'max-height: 44px' : 'max-height: 75px'">
        <div @click="icon.includes('fxt-chevron') ? $emit('openDropdown') : null"
            :style="icon.includes('fxt-chevron') ? 'cursor: pointer' : ''">
            <v-icon v-if="icon != ''" :size="iconSize" color="primary" class="pr-2 pb-1">{{ icon }}</v-icon><span
                :class="icon == '' ? 'pl-9' : ''">{{ title }}</span>
        </div>
        <v-switch class="login-dialog--login__content-container--switch" v-model="toggleState" :color="switchColor"
            :disabled="disabled"></v-switch>
    </div>
</template>
<script>
export default {
    name: "the-consent-toggle-item",
    props: {
        title: {
            required: true,
            default: ''
        },
        icon: {
            required: false,
            default: ''
        },
        iconSize: {
            required: false,
            default: '28px',
        },
        toggled: {
            required: true,
            default: false,
        },
        disabled: {
            required: false,
            default: false
        },
        switchColor: {
            required: false,
            default: '#579FA7' //Fixit color default
        }
    },
    computed: {
        toggleState: {
            get() {
                return this.toggled.toggleState
            },
            set(val) {
                this.$emit('setState', { nr: this.toggled.nr, toggleState: val })
            }
        }
    }
};
</script>
<style scoped>
</style>
