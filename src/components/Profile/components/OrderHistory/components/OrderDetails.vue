<template>
    <div>
        <div>
            <order-treatment-details :order="order"></order-treatment-details>
            <div class="profile__container--navigation__zig-zag mb-10"></div>
        </div>
        <!-- <div>
            <order-product-details :order="order"></order-product-details>
            <div class="profile__container--navigation__zig-zag mb-10"></div>
        </div> -->
    </div>
</template>

<script>
import OrderTreatmentDetails from './OrderTreatmentDetails.vue'
import OrderProductDetails from './OrderProductDetails.vue'
export default {
    components: { OrderProductDetails, OrderTreatmentDetails },
    props: {
        order: {
            required: true,
            default: null,
            type: Object
        }
    },
}
</script>