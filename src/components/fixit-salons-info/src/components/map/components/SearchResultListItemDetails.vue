<template>
	<transition name="fade-transition" mode="out-in">
		<div key="item" :class="{ item: true, 'primary--text': true, 'item-xsmall': xSmall }" v-if="!!item">
			<v-row dense align="center" v-if="!xSmall">
				<v-col cols="auto">
					<v-rating :value="5" dense style="position: absolute;">
						<template #item>
							<v-icon color="primary lighten-5">star</v-icon>
						</template>
					</v-rating>
					<v-rating :value="item.avarageRating" dense half-increments :style="{ 'max-width': ratingPercentage + '%' }" style="overflow: hidden">
						<template #item>
							<v-icon color="primary">star</v-icon>
						</template>
					</v-rating>
				</v-col>
				<v-col>{{ `${item.noOfRatings || 'Ingen'} ${item.noOfRatings == 1 ? 'vurdering' : 'vurderinger'}` }}</v-col>
			</v-row>
			<v-row dense align="center" :style="xSmall && { 'margin-bottom': '-4px' }">
				<v-col cols="auto">
					<svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 0 24 24" width="21">
						<circle cx="12" cy="12" r="12" :fill="!datetime || isAvailable ? '#472449' : '#A391A4'"></circle>
						<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" :fill="!datetime || isAvailable ? '#fce583' : '#765c76'" transform="scale(0.7) translate(5.5, 5.5)" />
						<path d="M0 0h24v24H0z" fill="none" />
					</svg>
				</v-col>
				<v-col>
					<div class="item-salon-address">{{ item.address | capitalize }}, {{ item.postalCode }} {{ item.postalArea | capitalize }}</div>
				</v-col>
			</v-row>
			<v-row dense align="center">
				<v-col cols="auto" v-if="!xSmall">
					<v-icon size="21" color="primary">access_time</v-icon>
				</v-col>
				<v-col cols="auto">
					<span v-if="item.openingHourToday.getIsOpenNow" class="font-weight-bold">Åpen nå</span>
					<span v-if="!item.openingHourToday.getIsOpenNow" class="text--primary">Stengt</span>
					<span v-if="!item.openingHourToday.getIsPastOpeningHours"> - {{ item.openingHourToday.getIsOpenNow ? 'Stenger kl. ' + item.openingHourToday.toFormatted : 'Åpner kl. ' + item.openingHourToday.fromFormatted }}</span>
				</v-col>
			</v-row>
			<v-row dense align="center">
				<v-col v-if="datetime" class="py-0 pr-0 font-weight-bold" :style="!isAvailable && { opacity: 0.5 }" :title="!isAvailable && 'Ingen ledig tid på valgt dato'">
					<span v-if="isAvailable" class="font-weight-bold">Ledig tid {{ datetime | timeToNow }}</span>
					<span v-if="!isAvailable" class="font-weight-bold">Ingen ledig tid {{ datetime | timeToNow }}</span>
					<!-- <v-chip color="primary" border :outlined="!isAvailable" :small="small || xSmall" :style="!isAvailable && { 'text-decoration': 'line-through' }">Ledig tid</v-chip> -->

					<!-- <v-btn
                        v-if="isAvailable"
                        icon
                        @click.prevent="showMoreAvailableTime = !showMoreAvailableTime"
                    >
                        <v-icon>{{ showMoreAvailableTime ? 'expand_less' : 'expand_more' }}</v-icon>
                    </v-btn> -->
				</v-col>
			</v-row>
			<!-- <v-expand-transition>
            <div v-show="showMoreAvailableTime">
                {{item}}
                
            </div>
            </v-expand-transition> -->
		</div>	
		<v-skeleton-loader key="loader" type="sentences" tile class="mt-3" v-else />
	</transition>
</template>

<script>
import { toCapitalized } from '@fixit/utils';

export default {
	name: 'search-result-list-item-details',
	data: () => ({
		showMoreAvailableTime: false
	}),

	props: {
		category: Number,
		treatment: Number,
		datetime: String,
		item: Object,
		small: Boolean,
		xSmall: Boolean
	},
	computed: {
		availableSites() {
			return this.$store.getters['search/availableSites'](this.datetime && new Date(this.datetime), this.treatment);
		},

		isAvailable() {
			return this.availableSites.includes(this.item.siteId);
		},

		ratingPercentage() {
			return (Math.round(this.item.avarageRating * 2) / 2 / 5) * 100;
		}
	},
	filters: {
		capitalize: toCapitalized,
		// timeToNow: formatDateDayNameAndDate
	}
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.item {
	line-height: 1.25;

	@media #{map-get($display-breakpoints, 'md-and-down')} {
		font-size: 0.8rem;

		.item-salon-address {
			font-size: 0.7rem;
			line-height: 0.8rem;
			margin-bottom: 4px;
		}
	}

	&::v-deep {
		.v-icon {
			width: 21px;
		}
	}

	&.item-xsmall {
		font-size: 0.7rem;
	}
}
</style>