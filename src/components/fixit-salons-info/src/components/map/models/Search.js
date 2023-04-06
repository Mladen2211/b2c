const HISTORY_LIMIT = 10;

export default class Search {
	constructor({ category = 0, datetime = '', timeSlotStart = 420, timeSlotEnd = 1440, industry = 0, latitude = 0, longitude = 0, placeid = '', search = '', searchtype = '', siteId = 0, treatment = 0, ...args }) {
		this.category = parseInt(args.fixitCategoryId || category || 0);
		this.datetime = datetime ? new Date(Math.max(new Date(datetime), new Date())).toISOString().substr(0, 10) : datetime;
		this.timeSlotStart = parseInt(timeSlotStart);
		this.timeSlotEnd = parseInt(timeSlotEnd);
		this.industry = parseInt(industry);
		this.latitude = parseFloat(args.lat || latitude);
		this.longitude = parseFloat(args.lng || longitude);
		this.placeid = args.placeId || placeid;
		this.search = (args.areaName || args.name || search || '');
		
		if(typeof this.search == 'string'){
			this.search = this.search.replace(/\+/g, ' ');
		}

		this.searchtype = args.type ? args.type.toLowerCase() : searchtype.toLowerCase();
		this.siteId = siteId;
		this.treatment = parseInt(args.fixitTreatmentId || treatment || 0);
		this.url = args.url;
		this.urlFrendlyLink = args.urlFrendlyLink;
	}

	/**
	 * Execute search and navigate to search result. Pushing the search into the search history,
	 * and saving the last used coordinates of the user if user's geo-location was used.
	 * If searchType is `salon` we navigate directly to the salon's booking page.
	 */
	execute(router) {
		const path = this.searchtype == 'salon' ? `${this.urlFrendlyLink}/${this.siteId}` : '/sok'; // '/search';
		const uri = encodeURI(
			`${path}
            ?search=${this.search.replace(/ /g, '+')}
            &treatment=${this.treatment}
            &category=${this.category}
            &searchtype=${this.searchtype}
            &datetime=${this.datetime}
            &timeSlotStart=${this.timeSlotStart}
            &timeSlotEnd=${this.timeSlotEnd}
            &latitude=${this.latitude}
            &longitude=${this.longitude}
            &placeid=${this.placeid}
            &industry=${this.industry}
        `.replace(/[\r\n ]+/gm, '')
		);

		// Navigate to FNB,
		if (this.searchtype == 'salon') {
			location = uri;
		}

		// or regular search
		else {
			router
				.push({
					name: 'search',
					query: {
						search: this.search,
						searchtype: this.searchtype,
						category: this.category,
						treatment: this.treatment,
						datetime: this.datetime,
						timeSlotStart: this.timeSlotStart,
						timeSlotEnd: this.timeSlotEnd,
						latitude: this.latitude,
						longitude: this.longitude,
						placeid: this.placeid,
						industry: this.industry
					}
				})
				.catch(() => {});
		}
	}
}