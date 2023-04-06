<template>
    <div>
        <p>Ordre #{{order.orderId}} bestilt {{order.orderDate}} {{order.orderTime}}</p>
        <p class="font-weight-bold">Produkter hos {{order.salon.name}}</p>

        <div class="profile__container--content__orderhistory--details d-flex align-center mb-5">
            <p class="mb-0 font-weight-bold">Status:</p>
            <v-chip
            class="ml-2"
            color="#472449"
            style="color: white"
            >
            {{productsOrder.status}}
            </v-chip>
        </div>

        <div v-for="product in productsOrder.products" :key="product.productIdBase64">
            <div class="d-flex align-center justify-space-between mb-5">
                <div class="profile__container--content__orderhistory--details">
                    <p class="mb-0 font-weight-bold">{{product.productName}}</p>
                    <p class="mb-0">{{product.brand}}</p>
                </div>
                <div class="profile__container--content__orderhistory--details-price font-weight-bold">
                    <p class="mb-0">{{product.price}},00</p>
                </div>
            </div>
        </div>

        <div class="d-flex align-center justify-space-between">
            <div class="profile__container--content__orderhistory--details">
                <p class="mb-0 font-weight-bold">Frakt</p>
                <p class="mb-0">{{productsOrder.shippingType}}</p>
            </div>
            <div class="profile__container--content__orderhistory--details-price font-weight-bold">
                <p class="mb-0">{{productsOrder.shippingFee}},00</p>
            </div>
        </div>


        <div class="d-flex justify-space-between align-center pt-5 mb-5">
            <p class="font-weight-bold mb-0">Sum Produkter</p>
            <div class="profile__container--content__orderhistory--details-price font-weight-bold">
                <p class="mb-0">{{productsOrder.totalPrice}},00</p>
            </div>
        </div>

        <div class="d-flex align-center justify-space-between">
            <div>
                <p class="mb-0 font-weight-bold">Sum totalt</p>
                <p class="mb-0">herav mva.</p>
            </div>
            <div class="profile__container--content__orderhistory--details-price">
                <p class="mb-0 font-weight-bold">{{productsOrder.totalPriceIncVat}},00</p>
                <p class="mb-0 text-right" style="font-size: 14px">{{productsOrder.totalPriceIncVat - productsOrder.totalPrice}},00</p>
            </div>
        </div>
        <div class="d-flex justify-space-around pt-5">
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
        }
    },
    computed: {
        productsOrder() {
            return this.order.productsOrder
        }
    }
}
</script>