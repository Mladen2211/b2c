<template>
    <div class="text-center">
        <div class="d-flex justify-center my-14">
            <animated-icon size="174" :icon="icon" iconColor="primary"
                backgroundColor="var(--v-primary-opacity-12)"></animated-icon>
        </div>
        <div class="description">
            <p>{{ title }}</p>
        </div>
        <v-btn class="font-weight-bold secondary-font text-none my-6 px-16" color="primary" rounded outlined
            @click="redirect(redirectUrl)">
            <div>{{ buttonText }}</div>
        </v-btn>
    </div>
</template>

<script>
import AnimatedIcon from './AnimatedIcon.vue'

export default {
    components: { AnimatedIcon },
    props: {
        title: {
            required: false,
            default: '',
            type: String
        },
        icon: {
            required: false,
            default: 'fxt-heart',
            type: String
        },
        buttonText: {
            required: false,
            default: 'Neste',
            type: String
        },
        redirectUrl: {
            required: false,
            default: '',
            type: String
        }
    }
}
</script>

<style scoped>
.description {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
}
</style>