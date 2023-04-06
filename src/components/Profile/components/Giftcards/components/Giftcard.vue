<template>
    <div class="d-flex justify-space-between align-center py-3 primary-font">
        <div class="d-flex">
            <v-img width="116" height="76" :src="salon.imgUrl"></v-img>
            <div class="pl-2">
                <span class="font-weight-bold" :style="layout == 'portal' ? 'color: var(--v-primary-base)' : ''">{{salon.salonName}}</span><br>
                <span class="font-weight-light">{{salon.salonAddress}}</span> <br>
                <span class="font-weight-light">{{salon.distanceFromUser}}</span>
            </div>
        </div>
        <div>
            <transition mode="out-in" name="fab-transition">
                <div>
                    <v-btn
                    v-if="!edit"
                    text
                    color="primary"
                    @click="redirect(salon)"
                    >
                        <div class="font-weight-bold">Gå til</div>
                        <v-icon>fxt-chevron-right</v-icon>
                    </v-btn>
                    <v-btn
                        v-if="edit"
                        class="mx-2"
                        elevation="0"
                        fab
                        small
                        color="white"
                    >
                        <v-icon color="primary">fxt-trash</v-icon>
                    </v-btn>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        salon: {
            type: Object,
            required: true,
            default: null,
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
        }
    },
    methods: {
        redirect(salon) {
            // this.$router.push(`/behandlinger/${treatment.urlSafeName}/${treatment.treatmentIdBase64}`)
        }
    },
    computed: {

    }
}
</script>