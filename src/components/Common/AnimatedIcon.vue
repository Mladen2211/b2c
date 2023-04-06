<template>
    <div :style="`max-width: ${size*1.25}px`">
        <!-- TODO: Add the animation effect, and make the background overlay the icon -->
        <div class="mask-skew" :style="`background: ${backgroundColor}; width: ${size*1.25}px; height: ${size - (size/6)}px`">
            <div class="art-skew">
                <v-icon :color="iconColor" :size="size">{{icon}}</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: {
            required: true,
            default: 'fxt-check',
            type: String
        },
        iconColor: {
            required: false,
            default: '#222222',
            type: String
        },
        backgroundColor: {
            required: false,
            default: '#ffffff',
            type: String
        },
        size: {
            required: false,
            default: '100',
            type: String
        }
    }
    
}
</script>
<style lang="scss" scoped>
.mask-skew {
	transform: skewY(-15deg);
}

.art-skew {
	transform: skewY(15deg);
    position: relative;
    top: -15%;
}
</style>