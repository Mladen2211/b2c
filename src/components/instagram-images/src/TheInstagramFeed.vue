<template>
  <v-sheet class="salon-instagram" v-if="instagramImages && instagramImages.length">
    <div :class="isMounted && $vuetify.breakpoint.smAndDown ? 'd-flex justify-center' : 'salon-instagram__center'" class="pb-5 salon-instagram__title primary-font" style="width: 100%">
      <f-icon style="margin:5px 10px 0 0; height: 30px" size="30px" icon="icon-instagram"/>
      <span>{{title}}</span>
    </div>
    <div v-if="salonSelector">
      <department-selector :class="isMounted && $vuetify.breakpoint.mdAndUp ? '' : 'mx-10'" v-on:change-salon="changeSalon($event)" :salons="mappedSalons"></department-selector>
    </div>
    <div class="salon-instagram__slide-track d-flex" v-if="isMounted && $vuetify.breakpoint.mdAndUp">
      <div class="">
        <v-row class="d-flex flex-nowrap" style="overflow: hidden" no-gutters>
          <v-hover
            v-for="image in filteredInstagramImages"
            :key="image.id"
            v-slot="{ hover }"
          >
            <v-col class="salon-instagram__image-column">
              <instagram-image height="280px" width="280px" :hover="hover" :image="image" :contain="true"></instagram-image>
            </v-col>
          </v-hover>
        </v-row>
      </div>
      <div>
        <v-row class="d-flex flex-nowrap" style="overflow: hidden" no-gutters>
          <v-hover
            v-for="image in filteredInstagramImages"
            :key="image.id"
            v-slot="{ hover }"
          >
            <v-col class="salon-instagram__image-column">
              <instagram-image height="280px" width="280px" :hover="hover" :image="image" :contain="true"></instagram-image>
            </v-col>
          </v-hover>
        </v-row>
      </div>
    </div>
    <div class="d-flex pb-5" v-else>
        <v-row no-gutters>
          <v-hover
            v-for="image in filteredInstagramImages.slice(0,8)"
            :key="image.id"
            v-slot="{ hover }"
          >
            <v-col :class="isMounted && $vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'" cols="6" md="2">
              <instagram-image height="175px" width="175px" :hover="hover" :image="image" :contain="true"></instagram-image>
             </v-col>
          </v-hover>
        </v-row>
    </div>
  </v-sheet>
</template>
<script>
import mock from "./data/mock.js";
import InstagramImage from './components/InstagramImage.vue'
import InstagramMappedImage from './models/InstagramImage.js'
import FIcon from '@fixit/icons/src/components/FIcon.vue'
import DepartmentSelector from "./components/DepartmentSelector.vue"

export default {
  components: {
    InstagramImage,
    DepartmentSelector,
    FIcon,
  },
  props: {
    salons: {
      type: Array,
      required: false,
      default: () => {
        []
      }
    },
    title: {
      type: String,
      required: false,
      default: 'Siste bilder fra våre avdelingers Instagram-kontoer'
    },
    salonSelector: {
      type: Boolean,
      requried: false,
      default: true
    },
    images: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    maxNumberOfImages: {
      type: Number,
      required: false,
      default: 14
    }
  },
  data() {
    return {
      currentSiteId: 0,
      isMounted: false,
    };
  }, 
  methods: {
    changeSalon(value) {
      this.currentSiteId = value
    }
  },
  mounted() {
    this.isMounted = true;
  },
  computed: {
    mappedSalons () {
      const salons = this.instagramImages.map(x => ({
        siteName: x.siteName,
        siteId: x.siteId
      }))

      return salons
    },
    instagramImages() {
      
      let mappedMockimages = mock.mockImages.map(x => new InstagramMappedImage(x))

      mappedMockimages.sort(function (a, b) {
        if (a.timestamp > b.timestamp) {
          return -1
        }
      })

      if (this.images == null || this.images == undefined) {
        return mappedMockimages;
      }

      if (!this.images.length) {
        return this.images
      }

      if (this.currentSiteId > 0) {
        this.images = this.images.filter(x => x.siteId === this.currentSiteId)
      }

      this.images.sort(function (a, b) {
        if (a.timestamp > b.timestamp) {
          return -1
        }
      })
      
      return this.images.map(x => new InstagramMappedImage(x));
    },
    filteredInstagramImages() {
      let images = this.instagramImages

      if (this.currentSiteId > 0) {
        images = images.filter(x => x.siteId === this.currentSiteId)
      }
 
      return images.slice(0, this.maxNumberOfImages)
    },
  },
};
</script>
<style lang="scss">
@import "./assets/instagram.scss";
</style>