<template>
  <!-- <v-sheet > -->
    <div class="salon-list__list">
      <v-row :justify="isMounted && $vuetify.breakpoint.smAndUp ? 'start' : 'center'" style="max-width: 100vw;">
          <v-col style="max-width: 100vw;" align="center" cols="12" lg="3" md="4" sm="6" v-for="(salon, i) in salons" :key="i" >
            <the-salon-item 
            :salon="salon"></the-salon-item>
          </v-col>
      </v-row>
    </div>
  <!-- </v-sheet> -->
</template>
<script>
    import TheSalonItem from './components/TheSalonItem.vue'
    export default {
        name: "the-salon-list",
        props: {
            salons: {
            type: Array,
            required: true,
            },
        },
        components: {
            TheSalonItem
        },
        data: () => ({
          isMounted: false,
        }),
        mounted() {
          this.isMounted = true;
        }
    };
</script>
<style lang="scss">
</style>