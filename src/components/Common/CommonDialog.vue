<template>
    <div>
        <v-dialog v-bind="show" max-width="580" @click:outside="$emit('closeDialog')">
            <v-card tile elevation="0">
                <v-card-title class="dialog-container--header" :style="layout == 'portal' ? 'background: linear-gradient(90deg, #BFE5E8 0%, #EFDDD1 100%);' : 'background: var(--v-primary-opacity-12)'">
                    <v-icon color="primary" size="28">{{icon}}</v-icon>
                    <span class="dialog-container--header--text">{{title}}</span> 
                    <v-btn
                        class="mx-2"
                        style="right: 0"
                        elevation="0"
                        fab
                        absolute
                        small
                        color="transparent"
                    >
                        <v-icon  
                            color="primary"
                            @click="$emit('closeDialog')"
                        >
                            fxt-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="dialog-container--content-text">
                    <slot class="pa-0 pt-5" style="">Ingen innhold</slot>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn 
                        class="text-none px-4" 
                        color="primary" 
                        rounded 
                        text 
                        @click="$emit('closeDialog')"
                    >
                        <span class="font-weight-bold">{{buttonTextCancel}}</span>
                    </v-btn>
                    <v-btn 
                        class="text-none px-4" 
                        :color="buttonColorConfirm"
                        :style="'color:' + buttonTextColorConfirm"
                        rounded 
                        @click="$emit('confirmAction')"
                    >
                        <div>{{buttonTextConfirm}}</div>
                        <v-icon class="pl-2 pb-1" size="22">{{buttonIconConfirm}}</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            required: true,
            default: false,
            type: Boolean
        },
        icon: {
            required: false,
            default: '',
            type: String
        },
        title: {
            required: true,
            default: '',
            type: String
        },
        buttonTextConfirm: {
            required: true,
            default: '',
            type: String
        },
        buttonIconConfirm: {
            required: false,
            default: '',
            type: String
        },
        buttonColorConfirm: {
            required: false,
            default: 'primary',
            type: String
        },
        buttonTextColorConfirm: {
            required: false,
            default: 'var(--v-primary-text-base)',
            type: String
        },
        buttonTextCancel: {
            required: false,
            default: 'Avbryt',
            type: String
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
}
</script>

<style lang="scss">
    .dialog-container {
        &--header {
            color: var(--v-primary-base);
            flex-wrap: nowrap;
            padding: 16px !important;
            &--text {
                font-weight: 700;
                font-size: 17px;
                line-height: 28px;
                padding-left: 8px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
        &--content-text {
            color: #222222 !important;
            padding-top: 20px !important;
            padding-bottom: 0px !important;
            width: 75%; 
            margin: 0 auto;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
        }
    }
</style>