<template>
    <div 
        class="search-map-mobile-touch-area"
        :style="{ background: displayMapClickMessage ? 'rgba(0, 0, 0, 0.4)' : 'none' }"
        id="enable-fullscreen-button"
        @click="enableFullScreenMap" 
        v-if="$vuetify.breakpoint.smAndDown && !mapIsFullscreen">

            <v-container fill-height fluid v-touch="{
                        left: showMessageOverMapAboutClickToEngage,
                        right: showMessageOverMapAboutClickToEngage,
                        up: showMessageOverMapAboutClickToEngage,
                        down: showMessageOverMapAboutClickToEngage
                    }"
                    
                    >
                <v-row align="center"
                    justify="center" class="mx-0">
                    <v-col class="text-center white--text" style="font-size: 1.5rem;" v-if="displayMapClickMessage">
                        Trykk for å bruke kartet
                    </v-col>
                </v-row>
            </v-container>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                displayMapClickMessage: false
            }
        },
        computed: {
            mapIsFullscreen(){
                return this.$store.getters['search/mapIsFullscreen']
            }
        },
        methods: {
            showMessageOverMapAboutClickToEngage(){

                // Only start the display map click message when not already running
                if(!this.displayMapClickMessage){
                    this.displayMapClickMessage = true;
                    
                    // Hide the map click message 
                    setTimeout(() => {
                        this.displayMapClickMessage = false;
                    }, 2000);
                }
            },
            enableFullScreenMap(){
                this.$store.dispatch('search/toggleMapIsFullscreen')
            }
        }
    }
</script>

<style lang="scss" scoped>
.search-map-mobile-touch-area { 
		transition: background 1s ease;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>