<template>
    <!-- <div class="profile__container--content__mysalons primary-font pt-5">
        <div v-for="salon in dummy" :key="salon.title">
            <giftcard :salon="salon" :edit="edit" :layout="layout"></giftcard>
        </div>
        <div class="d-flex justify-end">
            <v-btn
                class="font-weight-bold secondary-font text-none my-6"
                color="primary"
                rounded
                outlined
            >
                <div>Søk etter flere</div>
            </v-btn>
        </div>
    </div> -->
    <div>
        <title-and-edit currentViewTitle="Gavekort" :layout="layout"/>
        <no-content title="Ingen gavekort ennå." icon="fxt-gift" buttonText="Kjøp gavekort"/>
    </div>
            
</template>

<script>
import Giftcard from './components/Giftcard.vue'
import {NoContent, TitleAndEdit} from '../../../Common/index'
export default {
    components: { Giftcard, NoContent, TitleAndEdit },
    props: {
        edit: {
            required: false,
            default: false,
            type: Boolean
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    computed: {

    }
}
</script>