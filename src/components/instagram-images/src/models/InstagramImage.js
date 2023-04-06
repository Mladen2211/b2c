// import moment from '@/plugins/moment';
import { toCamelCaseProperties } from '@fixit/utils';

export default class InstagramMappedImage {
    constructor( args ) {
        args = toCamelCaseProperties( args ) || {};

        this.id = args.id ?? '';
        this.media_url = args.media_url ?? '';
        this.caption = args.caption ?? '';
        this.media_type = args.media_type ?? 0;
        this.permalink = args.permalink ?? '';
        this.thumbnail_url = args.thumbnail_url ?? '';
        this.timestamp = args.timestamp ?? '';
        this.username = args.username ?? '';
        this.siteId = args.siteId ?? '';
        this.siteName = args.siteName ?? '';
    }
}