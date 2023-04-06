export default ( { $config, $gtm }, inject ) => {

    var google = {
        googleApiKey: $config.GOOGLE_API_KEY,
    }
    google.sendEvent = ( category, action, label, value ) => {
        try {
            $gtm.push( {
                event: 'GAEventPortal', // helper.IsTpn() ? 'GAEventFNB' : 'GAEventPortal',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value
            } );
        } catch ( err ) {
            console.error( err );
        }
    }

    google.sendEventButtonClick = ( action, label, value ) => {
        try {
            $gtm.push( {
                event: 'GAEventPortal', // helper.IsTpn() ? 'GAEventFNB' : 'GAEventPortal',
                eventCategory: 'click',
                eventAction: action,
                eventLabel: label,
                eventValue: value
            } );
        } catch ( err ) {
            console.error( err );
        }
    }

    google.sendPageView = ( title, url ) => {
        try {
            $gtm.push( {
                event: 'pageview', // helper.IsTpn() ? 'virtualPageviewFNB' : 'virtualPageviewPortal',
                page: {
                    path: url,
                    title: title
                }
            } );
        } catch ( err ) {
            console.error( err );
        }
    }
    google.sendVirtualPageViewPortal = ( title, url ) => {
        try {
            $gtm.push( {
                event: 'virtualPageviewPortal', // helper.IsTpn() ? 'virtualPageviewFNB' : 'virtualPageviewPortal',
                virtualPageViewURL: url,
                virtualPageViewTitle: title
            } );
        } catch ( err ) {
            console.error( err );
        }
    }


    inject( 'google', google )

};
