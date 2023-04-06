<template>
    <v-card
    color="white"
    width="285"
    height="93"
    id="salon-card-button"
    @click="navigateToUrl()"
    target="_blank"
    class="info-window-salon"
  >
    <div class="d-flex flex-row">
        <div class="info-window-salon__image">
            <v-img
                :src="salonImage"
                height="76px"
            ></v-img>
        </div>
        <div class="info-window-salon__info">
            <!-- <div class="chain-img-container">
                <v-img :src="salon.chainImageLocation" max-heigth="70" width="70px" height="40px" aspect-ratio="340/640"></v-img>
            </div> -->
            <v-card-title class="info-window-salon__info__title">
                <div class="secondary-font">{{salon.name}}</div>
            </v-card-title>

            <v-card-subtitle class="info-window-salon__info__details secondary-font">
                <!-- <search-result-list-item-details :item="salonDetails" v-bind="$props" x-small /> -->
                <div class="info-window-salon__info__details__address">{{salon.address}}</div>
                <div class="info-window-salon__info__details__distance">{{salonDistance(salon.distanceFromUser)}}</div>
            </v-card-subtitle>
        </div>
    </div>
  </v-card>
</template>

<script>
import { toCapitalized } from '@fixit/utils';
import {MarkerDetails} from '../models/GeoLocation'
import SearchResultListItemDetails from './SearchResultListItemDetails.vue';

export default {
    name: 'search-map-info-window-card',
    components: { SearchResultListItemDetails },
    props: {
        category: Number,
		treatment: Number,
		datetime: String,
        salon: {
            type: Object,
            default: null
        },
        isMobile: Boolean
    },
    computed: {
        salonDetails() {return new MarkerDetails(this.salon) },
        mapIsFullscreen() { return false },
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
    data() {
        return {
            show: false
        }
    },
    filters: {
        capitalize: toCapitalized
    }
}
</script>
<style lang="scss">
// Google Maps override style
.search-map{
.gm-style-iw-d{
    overflow: hidden !important;
}
.gm-style .gm-style-iw-c{
    padding: 0 !important;
    border-radius: 4px;

    button{
        top: -5px !important;
        right: -5px !important;
    }
}
}

</style>

<style lang="scss" scoped>
@import '~@/styles/variables';

// .info-window-salon-details{
//     font-size: 0.8rem;
//     line-height: 1.3rem;
// }

.info-window-salon {
   &__image {
        width: 132px;
        padding: 8px;
    }
    &__info {
        width: 132px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &__title {
            word-break: keep-all; 
            padding: 0px;
            margin: 8px 0;
            font-weight: 700;
            font-size: 16px;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        &__details {
            padding: 8px 0;
            &__address {
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            &__distance {
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
            }
        }
    }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
   .info-window-salon__info {
       width: 125px;
    }
    
}



// @media #{map-get($display-breakpoints, 'xs-only')} {
//    .info-window-salon-title{
//        font-size: 0.5rem;
//     }
//     .info-window-salon-details{
//         font-size: 0.7rem;
//         line-height: 1rem;
//     }
//     .info-window-salon-opening-hours{

//         font-size: 0.7rem;
//     }
// }

// .chain-img-container {
// 	position: absolute;
// 	margin-top: -26px;
// 	margin-left: 16px;
// 	width: 70px;
// }
</style>