<template>
    <div>
        <title-and-edit currentViewTitle="Profil" @toggleEdit="toggleEdit" @confirmAction="updateProfile" :edit="edit" :layout="layout"/>
        <div class="pt-5">
            <v-row justify="space-between">
                <v-col cols="12" sm="6" md="6" lg="6">
                    <div class="py-2">
                        <div class="font-weight-bold">Fornavn</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.firstName}}</p>
                            <v-text-field
                                v-else
                                v-model="user.firstName"
                                required
                                :rules="[rules.required, rules.name]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>

                    <div class="py-2">
                        <div class="font-weight-bold">Etternavn</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.lastName}}</p>
                            <v-text-field
                                v-else
                                v-model="user.lastName"
                                required
                                :rules="[rules.required, rules.name]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>

                    <div class="py-2">
                        <div class="font-weight-bold">E-post</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.email}}</p>
                            <v-text-field
                                v-else
                                v-model="user.email"
                                required
                                :rules="[rules.required, rules.email]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>
                    
                    <div class="py-2">
                        <div class="font-weight-bold">Mobilnummer</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.mobileNumber}}</p>
                            <v-text-field
                                v-else
                                v-model="user.mobileNumber"
                                required
                                :rules="[rules.required, rules.mobile]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>

                    <div class="py-2">
                        <div class="font-weight-bold">Telefon arbeid (valgfri)</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.phoneNoWork}} <span v-if="!user.phoneNoWork" class="text--disabled">Ikke oppgitt</span></p>
                            <v-text-field
                                v-else
                                v-model="user.phoneNoWork"
                                :rules="[rules.optionalPhone]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>
                    <div class="py-2">
                        <div class="font-weight-bold">Hjemmetelefon (valgfri)</div>
                        <v-form v-model="validated">
                        <p v-if="!edit">{{user.phoneNoHome}} <span v-if="!user.phoneNoHome" class="text--disabled">Ikke oppgitt</span></p>
                            <v-text-field
                                v-else
                                v-model="user.phoneNoHome"
                                :rules="[rules.optionalPhone]"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                    <div class="py-2">
                        <div class="font-weight-bold">Adresse</div>
                        <v-form v-model="validated">
                            <p v-if="!edit">{{user.address}} <span v-if="!user.address" class="text--disabled">Ikke oppgitt</span></p>
                            <v-text-field
                                v-else
                                v-model="user.address"
                                color="secondary"
                                dense
                            ></v-text-field>
                        </v-form>
                    </div>
                    <div class="d-flex">
                        <div class="py-2 pr-16">
                            <div class="font-weight-bold">Postnr</div>
                            <v-form v-model="validated">
                                <p v-if="!edit">{{user.postalCode}} <span v-if="!user.postalCode" class="text--disabled">Ikke oppgitt</span></p>
                                <v-text-field
                                    v-else
                                    v-model="user.postalCode"
                                    :rules="[rules.postalCode]"
                                    color="secondary"
                                    dense
                                ></v-text-field>
                            </v-form>
                        </div>
                        <div class="py-2">
                            <div class="font-weight-bold">Sted</div>
                            <v-form v-model="validated">
                                <p v-if="!edit">{{user.postalArea}} <span v-if="!user.postalArea" class="text--disabled">Ikke oppgitt</span></p>
                                <v-text-field
                                    v-else
                                    v-model="user.postalArea"
                                    :rules="[rules.name]"
                                    color="secondary"
                                    dense
                                ></v-text-field>
                            </v-form>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="font-weight-bold">Kjønn</div>
                        <v-radio-group v-model="user.gender" row class="mt-0">
                            <v-radio
                                label="Kvinne"
                                :value="0"
                                :disabled="!edit"
                                on-icon="fxt-radio-on"
                                off-icon="fxt-radio-off"
                            ></v-radio>
                            <v-radio
                                label="Mann"
                                :value="1"
                                :disabled="!edit"
                                on-icon="fxt-radio-on"
                                off-icon="fxt-radio-off"
                            ></v-radio>
                            <v-radio
                                label="Ikke valgt"
                                :value="null"
                                :disabled="!edit"
                                on-icon="fxt-radio-on"
                                off-icon="fxt-radio-off"
                            ></v-radio>
                        </v-radio-group>  
                    </div>
                </v-col>
            </v-row>
            <div v-if="layout == 'portal' && edit">
                <v-btn
                    class="font-weight-bold secondary-font text-none mt-4"
                    color="#EA412A"
                    rounded
                    outlined
                    @click="showDialog = !showDialog"
                >
                    <div>Slett min Fixit bruker</div>
                    <v-icon class="pl-2 pb-1" size="22">fxt-warning</v-icon>
                </v-btn>
                <common-dialog 
                    v-if="showDialog" 
                    :show="showDialog" 
                    :title="`Vil du virkelig slette din bruker?`" 
                    icon="fxt-warning"
                    buttonTextCancel="Nei, avbryt"
                    buttonTextConfirm="Ja, slett meg!"
                    buttonIconConfirm="fxt-trash-alt"
                    buttonColorConfirm="#EA412A"
                    @closeDialog="showDialog = false"
                    @confirmAction="showDialog = false"
                    :layout="layout"
                >
                    <p>Hvis du sletter din bruker vil hele Fixit profilen din slettes og du vil miste all historikk, lagrede elementer, salonger m.v. Skal du da bruke Fixit igjen må du lage en helt ny bruker.</p>
                    <p>Sletting av bruker kan ikke angres eller gjenopprettes. </p>
                    <p class="font-weight-bold">Vil du virkelig slette din bruker og alle data?</p>
                </common-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { CommonDialog, ProfileDropdown, TitleAndEdit } from '../../../Common/index'
import AppSvc from '../../../../services/app-svc'

let service = null;

import { User } from '../../../../models/index';

export default {
    components: { CommonDialog, ProfileDropdown, TitleAndEdit },
    props: {
        user: {
            required: true,
            default: null,
            type: Object
        },
        layout: {
            required: false,
            default: 'chain',
            type: String
        },
    },
    data: () => ({
        showDialog: false,
        edit: false,
        validated: false,
        rules: {
            required: value => !!value || 'Dette feltet er obligatorisk.',
            name: value => {
                const pattern = /^[a-zA-Z\s]*$/
                return pattern.test(value) || 'Navn kan ikke inneholde tall eller spesialtegn.'
            },
            mobile: value => {
                const pattern = /^[0-9]{8}$/
                return pattern.test(value) || 'Mobilnummer må være 8 siffer.'
            },
            optionalPhone: value => {
                const pattern = /^[0-9]{8}$/
                return (pattern.test(value) || value.length == 0) || 'Telefonnummer må være 8 siffer.'
            },
            postalCode: value => {
                const pattern = /^[0-9]{4}$/
                return (pattern.test(value) || value.length == 0) || 'Postnummer må være 4 siffer.'
            },
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Ugyldig e-postaddresse.'
            },
        },
    }),
    computed: {
		isTpn() {
			return !!this.tpnChainId
		},
		tpnChainId() {
			return parseInt(this.$route.params.chainId || this.$route.query.chainId) || 0;
		},
		tpnSiteId() {
			return this.isTpn && this.salons?.length == 1 ? this.salons[0]?.siteId : 0;
		},
	},
    methods: {
        async updateProfile() {
			this.loading++;
			this.user.profileCreatedTime = this.$moment(this.user.profileCreatedTime).format('YYYY-MM-DD');
			this.user.profileUpdatedTime = this.$moment(this.user.profileUpdatedTime).format('YYYY-MM-DD');
			var user = new User(this.user);
			user.mobileNumber = this.user.mobileNumber;
			user.userId = this.user.membershipProfileId == "00000000-0000-0000-0000-000000000000" ? this.user.userId : this.user.membershipProfileId;
			user.birthDate = this.user.birthDate ? this.$moment(this.user.birthDate).format('YYYY-MM-DD') : null;
			var params = {
				isTpn: this.isTpn,
				tpnChainId: this.tpnChainId,
				tpnSiteId: this.tpnSiteId,
				code: null,
				mobile: this.user.mobileNumber,
				clientIdentity: null,
				password: null,
				src: 'webapp', // will become obsolete once app is ready
				isVerifiedByPassword: true,
				user: user,
			};
			const userRes = await service.UpdateProfile(process.env.VUE_APP_FIXIT_CORE_API_URL, params);
			if (userRes) {
                this.$forceUpdate();
				this.toggleEdit()
			} else {
                
            }
			this.loading--;
		},

        toggleEdit() {
            this.edit = !this.edit
        }
    },
    async created() {
		service = await AppSvc(this.$axios);
	},
    beforeDestroy() {
		service = null
	}
}
</script>