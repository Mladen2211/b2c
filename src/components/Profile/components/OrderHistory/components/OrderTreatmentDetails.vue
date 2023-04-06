<template>
    <div>
        <p>Ordre #{{order.appointmentId}} bestilt {{order.appointmentDate}} {{order.appointmentStartTime}}</p>
        <p class="font-weight-bold">Behandlinger hos {{order.siteName}}</p>

        <!-- TODO: Fetch order by id -->
        <div v-for="treatment in treatmentsOrder.treatments" :key="treatment.treatmentIdBase64">
            <div class="d-flex align-center justify-space-between pb-5">
                <div class="profile__container--content__orderhistory--details">
                    <p class="mb-1 font-weight-bold">{{treatment.treatmentName}}</p>
                    <p class="mb-1">{{treatment.durationMinutes}}min</p>
                    <p class="mb-1">{{treatment.employee}}, {{treatment.treatmentDate}} {{treatment.treatmentTime}}</p>
                </div>
                <div class="profile__container--content__orderhistory--details-price d-flex align-center font-weight-bold">
                    <p class="profile__container--content__orderhistory--details-price__from mb-0">Fra</p>
                    <p class="mb-0">{{treatment.price}},00</p>
                </div>
            </div>
        </div>


        <div class="d-flex justify-space-between align-center">
            <p class="font-weight-bold mb-0">Sum behandlinger</p>
            <div class="profile__container--content__orderhistory--details-price d-flex align-center font-weight-bold">
                <p class="profile__container--content__orderhistory--details-price__from mb-0">Fra</p>
                <p class="mb-0">{{treatmentsOrder.totalPrice}},00</p>
            </div>
        </div>
        <div class="d-flex justify-space-around pt-5">
            <v-btn
            text
            color="primary"
            >
                <div class="font-weight-bold text-none pr-1">Gjenta bestilling</div>
                <v-icon>fxt-cart</v-icon>
            </v-btn>
            <v-btn
            text
            color="primary"
            >
                <div class="font-weight-bold text-none pr-1">Kvittering (pdf)</div>
                <v-icon>fxt-download</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        order: {
            required: true,
            default: {},
            type: Object
        },
    },
    computed: {
        treatmentsOrder() {
            return this.order.treatmentsOrder
        }
    }
}
</script>