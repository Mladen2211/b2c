<template>
    <div>
        <title-and-edit currentViewTitle="Betalingsmetoder" :layout="layout"/>
        <div class="profile__container--content__payment-methods primary-font mt-5">
            <div>
                <payment-list-item title="Kort" :icon="visaIcon">
                    <cards class="pr-3 pl-10 my-5"></cards>
                </payment-list-item>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            </div>
            <div>
                <payment-list-item title="Vipps" :icon="vippsIcon">
                    <vipps class="pr-3 pl-10 my-5"></vipps>
                </payment-list-item>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            </div>
            <div>
                <payment-list-item title="Betal senere" :icon="walleyIcon">
                    <pay-later class="pr-3 pl-10 my-5"></pay-later>
                </payment-list-item>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            </div>
            <div>
                <payment-list-item title="Del opp betalingen" :icon="walleyIcon">
                    <split-payment class="pr-3 pl-10 my-5"></split-payment>
                </payment-list-item>
                <hr :class="`profile__container--navigation__${layout == 'portal' ? 'portal-linebreak' : 'linebreak'}`"/>
            </div>
        </div>
    </div>
</template>

<script>
import { TitleAndEdit } from '../../../Common/index'
import {Cards, SplitPayment, PayLater, Vipps, PaymentListItem } from './components/index'
export default {
    components: { PaymentListItem, Cards, SplitPayment, PayLater, Vipps, TitleAndEdit },
    props: {
        user: {
            required: true,
            default: '',
            type: Object,
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data() {
        return {
            vippsIcon: require("../../../../assets/img/vipps-logo-orange.png"),
            visaIcon: require("../../../../assets/img/cards-logo.png"),
            walleyIcon: require("../../../../assets/img/walley-logo.png"),
            edit: false,
        }
    },
}
</script>