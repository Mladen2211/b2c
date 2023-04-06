<template>
    <div>
        <v-hover v-slot="{ hover }">
            <div 
                class="d-flex justify-space-between align-center py-2 px-4" 
                :style="hover ? 'background-color: var(--v-primary-opacity-12); cursor: pointer;' : ''"
                @click="$emit('showOrderDetails', order)"
            >
                <div>
                    <p class="font-weight-bold mb-0">{{getDate(order.appointmentDate)}}<span class="font-weight-regular text--secondary"> ({{ description(order) }})</span></p>
                    <p class="mb-0">{{order.siteName}}</p>
                </div>
                <div class="d-flex profile__container--content__orderhistory--price">
                    <!-- TODO: Get appointment price for future/previous/cancelled -->
                    <p class="mb-0 pr-2">{{order.revenue}}</p>
                    <v-icon color="primary">{{icon(order.appointmentStatus)}}</v-icon>
                </div>
            </div>
        </v-hover>
        <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
    </div>
</template>

<script>
export default {
    components: {  },
    props: {
        order: {
            required: true,
            type: Object,
            default: null
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        
    }),
    computed: {

    },
    methods: {
        icon(status) {
            switch(status) {
                case 'future-visit': return 'fxt-calendar'
                case 'previous-visit': return 'fxt-calendar-check'
                case 'cancelled': return 'fxt-close'
                case 'product-purchase': return 'fxt-dispenser'
            }
        },
        getDate(appointmentDate) {
            return new Date(appointmentDate).toLocaleDateString("no-NO", { year: 'numeric', month: 'long', day: 'numeric' })
        },
        description(order) {
            /**
             * TODO - Implement logic to display different descriptions based on order status and date
             * 
             * Different orders have different description.
             * Future orders: 'om x dager'
             * Last visit: 'Siste besøk'
             * Visit before last visit: 'x dager før siste besøk'
             * Older visits: 'x dager mellom besøk'
             * Cancelled: 'Kansellert'
             * Products: 'x produkter'
             */
            return 'Om 10 dager'
        },
    },
}
</script>