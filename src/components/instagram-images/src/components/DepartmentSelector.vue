<template>
    <div>
        <v-row>
            <v-col md="4">
                <v-select
                    :items="mappedSalons"
                    item-text="name"
                    clearable
                    class="salon-instagram__salon-selector"
                    item-value="value"
                    @change="changeInstagramImages($event)"
                    placeholder="Alle våre instagram-kontoer"
                ></v-select>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props: {
        salons: {
            type: Array,
            required: true,
            default: () => {[]}
        }
    },
    data () {
        return {

        }
    },
    computed: {
        mappedSalons () {

            if (!this.salons || !this.salons.length) {
                return this.salons
            }

            let returnValue = []
            
            // add the 'velg alle field'
            returnValue.push({
                name: 'Alle',
                value: 0
            })

            for (var i in this.salons) {
                const salon = this.salons[i]
                returnValue.push({
                    name: salon.siteName,
                    value: salon.siteId
                })
            }

            return returnValue
        }
    },
    methods: {
        changeInstagramImages (value) {
            this.$emit('change-salon', value)
        }
    }
}
</script>