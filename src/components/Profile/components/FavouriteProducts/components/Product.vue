<template>
    <div class="d-flex justify-space-between align-center py-3 primary-font">
        <div class="d-flex">
            <v-img width="86" height="55" :src="product.imgUrl"></v-img>
            <div class="pl-2">
                <span >{{product.productName}}</span><br>
                <span class="font-weight-light">{{product.brand}}</span>
            </div>
        </div>
        <div>
            <transition mode="out-in" name="fab-transition">
                <div>
                    <v-btn
                    class="text-none"
                    v-if="!edit"
                    text
                    color="primary"
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
                        @click="$emit('delete-product', product.productId)"
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
        product: {
            type: Object,
            required: true,
            default: null,
        },
        edit: {
            required: false,
            default: false,
            type: Boolean
        }
    },
    methods: {
        
    },
    computed: {

    }
}
</script>