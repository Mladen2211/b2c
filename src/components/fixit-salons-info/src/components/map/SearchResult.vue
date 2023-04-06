<template>
	<div class="search">
		<v-container
			fluid
			class="search__container pa-0"
			style="height: 500px;"
		>
			<search-map :salons="salons" style="grid-area: map" />
		</v-container>
	</div>
</template>

<script>
import SearchMap from './components/SearchMap.vue';

export default {
	props: {
		salons: {
			required: true,
			default: []
		}
	},
	name: 'search-result-view',
	components: { SearchMap },
	data: () => ({
		mapIsFullscreen: false
	}),
	computed: {
	},
	methods: {
		toggleFullScreenMap() {
			this.mapIsFullscreen = !this.mapIsFullscreen
		}
	},
	watch: {
		
	},
	beforeDestroy() {
		// Make sure we reset fullscreen for the map
		if (this.mapIsFullscreen) {
			this.toggleFullScreenMap();
		}
	}
};
</script>

<style lang="scss" scoped>

.search {
	.filter-fixed-bottom {
		position: absolute;
		bottom: 30px;
		right: 150px;
		text-align: center;
		width: 80px;
	}
	.button-text {
		font-weight: 700;
		font-size: 14px;
		line-height: 16px;
		background-color: #F8F8F8;
		text-transform: initial;
	}

	&__container {
		position: relative;
	}
}
</style>
