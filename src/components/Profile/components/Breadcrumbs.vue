<template>
    <div class="breadcrumbs-container">
        <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs-container__breadcrumbs py-0 px-0">
            <template v-slot:divider>
                <v-icon size="24">fxt-chevron-right</v-icon>
            </template>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                id="breadcrumbs-button"
                :disabled="item.disabled"
                @click.native="switchComponent(item)"
                :style="!item.disabled ? 'cursor:pointer' : ''"
                >
                    <span class="breadcrumbs-container__breadcrumbs--text secondary-font" :style="item.name == breadcrumbs[breadcrumbs.length-1].name ? 'color: var(--v-primary-base)' : layout == 'portal' ? 'color: #579FA7' : 'color: initial !important'">{{ item.name }}</span>
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </div>
</template>
<script>
export default {
  name: 'breadcrumbs',
  props: {
    breadcrumbs: {
        type: Array,
        default: [],
        required: true,
    },
    layout: {
        required: false,
        default: 'chain',
        type: String
    },
  },
  methods: {
    switchComponent(item) {
        if (['Fixit', 'Hjem', 'Mine sider'].includes(item.name)) {
            switch (item.name) {
                case ('Fixit'): 
                    window.open(process.env.VUE_APP_FIXIT_NO_URL) 
                    break;
                case ('Hjem'): 
                    this.$router.replace('/'); 
                    this.$emit('close-profile')
                    break;
                case ('Mine sider'): 
                    this.$router.replace({query: {title: 'profil'}})
                    break;
            }
        } else {
            if (this.layout == 'chain') {
                !item.disabled ? this.$router.replace({query: { title: item.componentName 
                    ? item.componentName.toLowerCase().replace(' ', '-') 
                    : item.name.toLowerCase().replace(' ', '-'), 
                    ...(item.program && {id: item.program.programId})}}) : null
            } else {
                !item.disabled 
                ? this.$router.replace({name: item.componentName 
                    ? item.componentName 
                    : item.name, params: {id: item.id ? item.id : '', program: item.program 
                        ? item.program 
                        : null,
                    order: item.order ? item.order : null} }) 
                : null
    
            }
        }
    }
  }
};
</script>

<style lang="scss">
    .breadcrumbs-container {
        &__breadcrumbs {
            &--text {
                font-weight: 700;
                font-size: 16px;
                line-height: 20px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    .v-breadcrumbs li:nth-child(even) {
    padding: 0 4px;
    }
</style>
