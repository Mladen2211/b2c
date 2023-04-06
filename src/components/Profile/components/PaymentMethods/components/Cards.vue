<template>
<div>
    <div class="d-flex align-center">
        <div v-for="card in dummy" :key="card.cardNumber">
            <div class="profile__container--content__payment-methods--cards-container d-flex align-center mb-5">

                <v-card width="250px" height="148px" outlined class="profile__container--content__payment-methods--cards-container__card d-flex justify-space-between flex-column pa-5 pt-7">
                    <div class="d-flex justify-space-between align-center">
                        <p class="mb-0 font-weight-medium">{{card.cardNumber}}</p>
                        <v-btn
                            elevation="0"
                            fab
                            small
                            color="primary"
                            outlined
                        >
                            <v-icon  
                                color="primary" 
                                @click="selectedCard = card">fxt-trash
                            </v-icon>
                        </v-btn>
                    </div>
                    <div class="d-flex justify-space-between align-center">
                        <p v-if="!card.isExpired" class="mb-0">{{card.expirationDate}}</p>
                        <p v-else class="font-weight-medium mb-0" style="color: #EA412A">Utløpt</p>
                        <img :src="getProviderIcon(card.provider)">
                    </div>
                </v-card>
            </div>
        </div>
        <v-btn
            class="font-weight-bold secondary-font text-none ml-5 px-8"
            color="primary"
            rounded
            outlined
        >
            Bytt kort
        </v-btn>
    </div>
    <div class="d-flex align-center">
        <span class="font-weight-bold pb-1 mr-5">Bruk kort som standard betalingsmåte</span>
        <!-- Needs logic -->
        <v-switch
            color="primary"
        ></v-switch>
    </div>
    <common-dialog 
        v-if="selectedCard" 
        :show="selectedCard != null" 
        title="Vil du slette kortet?" 
        icon="fxt-warning" 
        buttonTextConfirm="Slett kort" 
        @closeDialog="selectedCard = null"
        @confirmAction="selectedCard = null"
        :layout="layout"
    >
        <p>Vil du slette VISA Kort {{selectedCard.cardNumber}}</p>
        <p>Sletter du kortet kan du ikke bruke betalingsmetoden uten å legge det til på nytt</p>
    </common-dialog>
</div>
</template>

<script>
import {cardsList} from '../../../dummy/cards'
import { CommonDialog } from '../../../../Common/index'
export default {
    components: { CommonDialog },
    data: () => ({
        mastercardLogo: require('../../../../../assets/img/mastercard-logo.png'),
        visaLogo: require('../../../../../assets/img/visa-logo.png'),
        showDialog: false,
        selectedCard: null,
    }),
    computed: {
        dummy() {
            return cardsList()
        },
    },
    methods: {
        getProviderIcon(provider) {
            return provider == 'Visa' ? this.visaLogo : this.mastercardLogo
        }
    }
}
</script>