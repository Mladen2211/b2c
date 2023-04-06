<template>
    <v-card
      class="salon-list__item"
      id="salon-card-button"
      @click="navigateToUrl()"
      width="270"
      tile
      hover
    >
      <v-img
        class="salon-list__item--image"
        :src="salonImage"
        height="152px"
      >
      </v-img>
      <v-card-text class="text--primary secondary-font">
        <div class="salon-list__item_content--name">{{salon.name}}</div>
        <div class="salon-list__item_content--address">{{salon.address + ", " + salon.postalCode + " " + salon.postalArea}}</div>
        <div class="salon-list__item_content--distance">{{salonDistance(salon.distanceFromUser)}}</div>
        <div class="card-bottom">
          <div class="pr-0 d-flex justify-space-between align-baseline" style="color: var(--v-primary-base)">
              <div class="salon-list__item_content--hours">
                {{ getTodaysHours.from }} - {{ getTodaysHours.to}}
              </div>
              <div v-if="getTodaysHours.isOpen" class="salon-list__item_content--hours">
                Åpent
              </div>
              <div v-else class="salon-list__item_content--hours" style="color:#EA412A;">
                Stengt
              </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: "the-salon-item",
        props: {
            salon: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {};
        },
        computed: {
          isOpen(){
            return this.salon.openingHours.some(x => x.isOpen)
          },
          getTodaysHours(){
            var today = new Date().getDay()
            return today != 0 ? this.salon.openingHours.find(h => h.day === today) : this.salon.openingHours.find(h => h.day === 7)
          },
          salonImage() {
            return this.$store.getters['cmsConfigHomepage/getSites'].filter(x => x.siteId == this.salon.siteId)[0].salonImageUrl
          }
        },
        methods: {
          navigateToUrl() {
            this.$router.push(`/about/${this.salon.urlFrendlyLink}`);
          },
          salonDistance(distance) {
            if (distance != null && distance != undefined && distance != NaN && distance != 0 && distance != '') {
              if (distance < 1) {
                return Math.round(distance*1000) + ' meter unna';
              } else if (distance >= 1 && distance <= 100) {
                return distance.toFixed(1) + ' kilometer unna';
              } else if (distance > 100) {
                return Math.round(distance) + ' kilometer unna';
              }
            } else {
              return ''
            }
          },
        },
    };
</script>
<style lang="scss">
</style>
