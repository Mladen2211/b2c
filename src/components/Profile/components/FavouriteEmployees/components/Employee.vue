<template>
    <div class="d-flex justify-space-between align-center py-3 primary-font">
        <div class="d-flex align-center">
            <v-avatar size="80px">
                <v-img :src="imgUrl(employee.imgUrl)"></v-img>
            </v-avatar>
            <span class="pl-5">{{employee.firstName + ' ' + employee.lastName}}</span>
        </div>
        <div>
            <transition mode="out-in" name="fab-transition">
                <div>
                    <v-btn
                    class="text-none"
                    v-if="!edit"
                    text
                    color="primary"
                    @click="redirect(employee)"
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
                        @click="$emit('delete-employee', employee.employeeId)"
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
        employee: {
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
        redirect(employee) {
            this.$emit('close-profile')
            this.$router.push(`/about/${employee.salonUrlSafe}/${employee.nameUrlSafe}`)
        },
        imgUrl(imgUrl) {
            return imgUrl.replace(/"/g, "")
        }
    },
    computed: {

    }
}
</script>