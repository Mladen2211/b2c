<template>
    <v-select :items="salons">

    </v-select>
</template>
<script>
import Site from '../../../models/site'
export default {
    data () {
        return {
            salons: [
                new Site ({
                    siteId: 101,
                    siteName: 'Bergen Ramsvik Sentrum',
                    chainName: 'Ramsvik av Ramm',
                    chainId: 36
                })
            ]
        }
    }
}
</script>