<template>
  <a id="instagram-image-button" target="_blank" :href="image.permalink" class="salon-instagram__image" v-if="image">
    <div v-if="hover" class="salon-instagram__caption" :style="isMounted && $vuetify.breakpoint.mdAndUp ? '' : 'width: 175px; height: 175px'">
      <v-icon color="white">mdi-instagram</v-icon>
    </div>
    <v-img :min-height="heigth" :width="width" :cover="cover" :contain="contain" :src="getImageUrl(image)">
          <div class="salon-instagram__type"><v-icon class="salon-instagram__type" color="white" x-small>{{ getIcon(image) }}</v-icon></div>
    </v-img>
    <!-- <p class="pt-2 font-weight-bold" style="color: var(--v-primary-base)">@{{ image.username }}</p> -->
  </a>
</template>
<script>
import InstagramImage from "../models/InstagramImage";
export default {
 
  props: {
    image: {
      type: InstagramImage,
      required: true,
      default: {},
    },
    heigth: {
        type: String,
        required: false,
        default: '170px'
    },
    cover: {
        type: Boolean,
        required: false,
        default: true
    },
    contain: {
        type: Boolean,
        required: false,
        default: false
    },
    width: {
        type: String,
        required: false,
        default: '170px'
    },
    hover: {
        type: Boolean,
        required: true,
        default: false
    }
  },
  data: () => ({
    isMounted: false,
  }),
  mounted() {
    this.isMounted = true;
  },
  methods: {
    getShortenedCaption(caption) {
      const maxCharacters = 24;
      if (caption === null || caption.length <= 0) {
        return ''
      }

      return caption.substring(0, maxCharacters) + '...'
    },
    getImageUrl(image) {
        if (image.thumbnail_url.length) {
            return image.thumbnail_url
        }  
        return image.media_url 
    },
    getIcon(image) {
        switch(image.media_type) {
            case 0: 
                return 'mdi-image-outline'
            case 1:
                return 'mdi-play-box'
            case 2: 
                return 'mdi-image-multiple'
        }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/instagram.scss";
</style>