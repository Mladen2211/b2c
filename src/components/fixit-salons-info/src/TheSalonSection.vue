<template>
  <div class="salon-list" v-if="mappedSalons">
    <!-- <div
      class="py-2 salon-list__title d-flex justify-space-between"
      style="width: 100%"
    > -->
    <div v-if="!isLandingPage && mappedSalons.length > 1" class="salon-list__title-container" :style="isMounted && $vuetify.breakpoint.xs ? 'justify-content: space-evenly' : ''">
      <h2 class="salon-list__title-container--title py-5 primary-font">{{title}}</h2>
      <v-btn color="primary" class="salon-list__title-container--btn" @click="scrollToMap()" rounded outlined>Se i kart</v-btn>
    </div>

    <h2 v-if="mappedSalons.length > 1 && isLandingPage" class="salon-list__landingpage-title center py-5 primary-font" :style="{'text-align': isMounted && $vuetify.breakpoint.smAndDown ? 'center' : '',}">{{title}}</h2>


      <!-- <transition
        mode="out-in"
        :name="
          [state.SALONS].includes(current)
            ? 'slide-x-reverse-transition'
            : 'slide-x-transition'
        "
      >
        <v-btn
          outlined
          fab
          height="44"
          width="44"
          color="primary"
          :ripple="false"
          v-if="[state.SALONS].includes(current)"
          key="salons"
          @click="current = state.MAP"
        >
          <v-icon color="primary" size="18"> mdi-map </v-icon>
        </v-btn>
        <v-btn
          icon
          height="44"
          width="44"
          color="primary"
          :ripple="false"
          v-else-if="[state.MAP].includes(current)"
          key="map"
          @click="current = state.SALONS"
        >
          <v-icon color="primary" size="30"> mdi-close </v-icon>
        </v-btn>
      </transition> -->
    <!-- </div> -->
    <!-- <transition
      mode="out-in"
      :name="
        [state.SALONS].includes(current)
          ? 'scroll-x-reverse-transition'
          : 'scroll-x-transition'
      "
    > -->
      <!-- <TheSalonList
        :salons="mappedSalons"
        v-if="[state.SALONS].includes(current)"
        key="salons"
      /> -->
      <div :class="{'center': isMounted && $vuetify.breakpoint.smAndDown}">
        <TheSalonList v-if="mappedSalons.length > 1" :salons="mappedSalons" key="salons"/>
        <div v-if="mappedSalons.length >= 4" class="salon-list__see-more d-flex justify-end mt-5">
          <NuxtLink id="more-departments-button" v-if="isLandingPage" :to="'/about'" style="color: var(--v-primary-base)" class="salon-list__see-more--btn secondary-font">Flere avdelinger</NuxtLink>
          <f-icon v-if="isLandingPage" style="margin-top:2px" color="primary" icon="icon-chevron-right"/>          
        </div>
      </div>

        <SearchResult id="salons-map" v-if="showMap" :salons="mappedSalons" key="map" :class="mappedSalons.length > 1 ? 'pt-5' : ''" />
      <!-- <v-card v-else-if="[state.MAP].includes(current)" key="map"> fff</v-card> -->
    <!-- </transition> -->
  </div>
</template>
<script>
import TheSalonList from "./components/salon-list/TheSalonList.vue";
import SearchResult from "./components/map/SearchResult.vue";
import dummy from "./data/dummy";
import Salon from "./models/Salon";
import FIcon from '@fixit/icons/src/components/FIcon.vue';
import { sortSalonListByUserLocation } from '@fixit/fixit-no-header/src/utils/location'

export default {
  props: {
    salons: {
      type: Array,
      required: false,
    },
    title: {
      type: String, 
      required: false,
      default: 'Andre avdelinger'
    },
    isLandingPage: {
      type: Boolean,
      required: false,
      default: false,
    },
    showMap: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  components: {
    TheSalonList,
    SearchResult,
    FIcon,
  }, 
  computed: {
    dummySalons()  {
      return dummy.dummySalons.map(x => new Salon(x))
    },
    mappedSalons () {
      if (this.salons === undefined || this.salons === null) {
        return this.dummySalons
      }
      if (this.salons.length <= 0) {
        return this.dummySalons
      }
      if (this.isLandingPage && this.salons.length > 4) return this.salons.slice(0, 4)
      else return this.salons.map(x => new Salon(x))
    }
  },
  methods: {
    scrollToMap() {
      const element = document.getElementById("salons-map");
      element.scrollIntoView({behavior: "smooth", block: "end"});
    }
  },
  async mounted() {
    this.isMounted = true;
    //Sort the salon list if the user accepts/has accepted sharing location.
    if (this.salons.length > 1) await sortSalonListByUserLocation(this, this.salons);
  },
  data() {
    return {
      isMounted: false,
      state: {
        SALONS: "salons",
        MAP: "map",
      },
      current: "salons",
    };
  },
};
</script>
<style lang="scss">
@import "./assets/salons.scss";
</style>