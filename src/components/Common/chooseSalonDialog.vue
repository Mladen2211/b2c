<template>
  <div>
    <div v-if="sites.length > 1">
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="(isMounted && $vuetify.breakpoint.mdAndUp) || defaultSize"
            id="booking-button1"
            :class="isBanner ? 'banner-button' : ''"
            class="font-weight-bold secondary-font"
            color="primary"
            elevation="0"
            rounded
            v-on="on"
            style="text-transform: none"
          >
            Bestill time
          </v-btn>
          <div v-else class="d-flex justify-center">
            <v-btn
              id="booking-button2"
              class="font-weight-bold secondary-font"
              color="primary"
              elevation="0"
              rounded
              style="text-transform: none; width: 90%"
              @click="openDialog()"
            >
              Bestill time
            </v-btn>
          </div>
        </template>
        <template>
          <v-card>
            <v-toolbar
              v-if="treatment"
              color="primary"
              class="primary-font"
              :style="
                isMounted && $vuetify.breakpoint.smAndDown
                  ? 'font-size: 18px;'
                  : 'font-size: 24px;'
              "
              dark
            >
              Hvor vil du bestille
              {{
                treatment.treatmentName.length > 25
                  ? treatment.treatmentName.slice(0, 25) + "..."
                  : treatment.treatmentName
              }}?
            </v-toolbar>
            <v-toolbar
              v-else
              color="primary"
              class="primary-font"
              style="font-size: 24px"
              dark
            >
              Hvor vil du bestille time?
            </v-toolbar>
            <v-card tile elevation="0" v-for="site in salons" :key="site.name">
              <v-card-text>
                <v-row align="center" class="pa-2">
                  <v-col :cols="treatment ? 9 : 9" :sm="treatment ? 6 : 8">
                    <v-row>
                      <p
                        class="font-weight-bold secondary-font mb-2 ml-1"
                        :style="
                          isMounted && $vuetify.breakpoint.mdAndDown
                            ? 'font-size: 16px;'
                            : 'font-size: 20px;'
                        "
                      >
                        {{ site.name || site.siteName }}
                      </p>
                    </v-row>
                    <v-row>
                      <div class="d-flex">
                        <v-icon size="20" class="pr-1" color="primary">
                          fxt-position
                        </v-icon>
                        <a
                          id="address-button"
                          class="address-link secondary-font"
                          :style="
                            isMounted && $vuetify.breakpoint.mdAndDown
                              ? 'font-size: 14px;'
                              : 'font-size: 16px;'
                          "
                          style="color: var(--v-primary-base)"
                          :href="
                            disabled
                              ? null
                              : `http://maps.google.com/?q=${site.address}, ${site.postalCode}`
                          "
                          target="_blank"
                        >
                          {{ site.address + "," }}
                          {{ +site.postalCode + " " + site.postalArea }}
                        </a>
                      </div>
                    </v-row>
                    <v-row>
                      <span v-if="site.distanceFromUser" class="pl-1 pt-1" style="color: var(--v-primary-base); font-size: 12px;">{{'(' + site.distanceFromUser.toFixed(2) + ' km)'}}</span>
                    </v-row>
                  </v-col>
                  <!-- <v-col style="border: 1px solid red" v-if="treatment" cols="4" sm="2" :style="$vuetify.breakpoint.smAndUp ? 'margin: 0 auto' : ''">
										<div class="font-weight-black secondary-font" style="font-size: 20px">{{ price(site.siteId) }},-</div>
									</v-col> -->
                  <v-col
                    :cols="treatment ? 3 : 3"
                    :sm="treatment ? 3 : 3"
                    class="ml-auto py-0"
                    style="text-align: right"
                  >
                    <div
                      class="d-flex align-center justify-end"
                      :style="
                        isMounted && $vuetify.breakpoint.xs && treatment
                          ? 'flex-direction: column; gap:10px'
                          : ''
                      "
                    >
                      <div
                        v-if="treatment && showPrice"
                        class="font-weight-black secondary-font pr-2"
                        style="font-size: 20px; color: var(--v-primary-base)"
                        :class="isMounted && $vuetify.breakpoint.xs ? 'pl-3' : ''"
                      >
                        {{ price(site.siteId) }},-
                      </div>
                      <v-btn
                        id="booking-button3"
                        class="font-weight-bold secondary-font"
                        color="primary"
                        @click="disabled ? null : redirect(site)"
                        rounded
                        style="text-transform: none"
                      >
                        Velg
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider class="mx-5"></v-divider>
            </v-card>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div v-else>
      <v-btn
        id="booking-button4"
        v-if="isMounted && $vuetify.breakpoint.mdAndUp || defaultSize"
        class="font-weight-bold secondary-font"
        :class="isBanner ? 'banner-button' : ''"
        color="primary"
        elevation="0"
        @click="disabled ? null : redirect(salons[0])"
        rounded
        style="text-transform: none"
        >Bestill time
      </v-btn>
      <div v-else class="d-flex justify-center">
        <v-btn
          id="booking-button5"
          class="font-weight-bold secondary-font"
          color="primary"
          elevation="0"
          rounded
          style="text-transform: none; width: 90%"
          @click="disabled ? null : redirect(salons[0])"
          >Bestill time
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "../../models/index";
import CmsHomepageModuleEnum from "../../enums/cmsHomepageModuleEnum";

export default {
  name: "chooseSalonDialog",
  props: {
    treatment: {
      required: false,
      default: null,
    },
    sites: {
      required: true,
    },
    url: {
      required: true,
    },
    disabled: {
      required: false,
      default: () => {
        return false;
      },
    },
    defaultSize: {
      required: false,
      default: false,
    },
    isBanner: {
      required: false,
      default: false,
    },
    type: [Header, Object],
    default: function () {
      return new Header();
    },
  },
  data: () => ({
    dialog: false,
    isMounted: false,
  }),
  methods: {
    price(siteId) {
      return this.treatment.pricePerSite.find((doc) => doc.siteId == siteId)
        .price;
    },
    redirect(site) {
      if (this.treatment) {
        let routeDataTreatment = this.$router.resolve({
          name: "redirect",
          path: `${this.url}/booking/${site.siteId == 2546 ? 2552 : site.siteId}`, //REMOVE "site.siteId == 2546 ? 2552 : " LATER. OLE MAGNUS TAULE WILL LET US KNOW ONCE IT CAN BE REMOVED - TSM 10.03.2023
          query: { treatmentIds: [`${btoa(this.treatment.treatmentId)}`] },
        });
        window.open(routeDataTreatment.href, "_blank");
      } else {
        let routeDataBanner = this.$router.resolve({
          name: "redirect",
          path: `${this.url}/booking/${site.siteId == 2546 ? 2552 : site.siteId}`, //REMOVE "site.siteId == 2546 ? 2552 : " LATER. OLE MAGNUS TAULE WILL LET US KNOW ONCE IT CAN BE REMOVED - TSM 10.03.2023
        });
        window.open(routeDataBanner.href, "_blank");
      }
    },
    openDialog() {
      this.dialog = !this.dialog;
      this.$emit("closeMenu");
    },
  },
  computed: {
    salons() {
      let sites = [];
      let siteIds = this.sites.map((s) => s.siteId);
      siteIds.forEach((siteId) => {
        if (this.treatment) {
          this.treatment.pricePerSite.forEach((priceSite) => {
            if (priceSite.siteId == siteId)
              sites.push(this.sites.find((s) => s.siteId == siteId));
          });
        } else {
          sites.push(this.sites.find((s) => s.siteId == siteId));
        }
      });
      return sites;
    },
    showPrice() {
      var modules = this.$store.getters["cmsConfigHomepage/getModules"];
      let moduleShowPricesValue = modules.find(
        (m) => m.moduleId == CmsHomepageModuleEnum.PRICES
      )?.visible;
      let prices = true;
      if (moduleShowPricesValue != undefined && moduleShowPricesValue != null)
        prices = moduleShowPricesValue;
      return prices;
    },
    isDraft() {
      return this.$store.getters["cmsConfigHomepage/isDraftMode"];
    },
  },
  mounted() {
    this.isMounted = true;
    this.$root.$on("openSalonDialog", () => {
      this.openDialog();
    });
  },
};
</script>

<style lang="scss" scoped>
.address-link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.banner-button {
  border-radius: 25px;
  height: 44px !important;
  padding: 14px 60px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  line-height: 16px !important;
  text-transform: none;
}
</style>

