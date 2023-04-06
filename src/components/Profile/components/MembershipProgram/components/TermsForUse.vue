<template>
    <div v-if="fetchedProgram != null">
        <div class="profile__container--content__title primary-font pb-10">
            <span>Vilkår for bruk</span>
        </div>
        <div class="profile__container--content__membershipProgram--info-page__description">
            <p><span v-html="program.termsOfUse"></span></p>
        </div>
    </div>
</template>

<script>
import ProfileSvc from '../../../../../services/profile-svc';
let profileSvc = null;
export default {
    props: {
        layout: {
            required: false,
            default: 'chain',
            type: String
        }
    },
    data: () => ({
        fetchedProgram: null
    }),
    methods: {
        // formatBody(item) {
        //     if (typeof String.prototype.replaceAll == "undefined") {
        //         String.prototype.replaceAll = function (match, replace) {
        //             return this.replace(new RegExp(match, "g"), () => replace);
        //         };
        //     }
        //     return item.replaceAll("<br />", "</br>");
        // },
    },
    computed: {
        bookingApi() {
            return this.layout == 'portal' ? process.env.VUE_APP_FIXIT_NO_BOOKING_URL : this.$config.VUE_APP_FIXIT_NO_BOOKING_URL
        },
        program() {
            return this.fetchedProgram.program
        }
    },
    async created() {
        //TODO: Remove prop and rely on fetch by id (Figure out how to handle on salon side)
        profileSvc = await ProfileSvc(this.$axios);
        this.fetchedProgram = await profileSvc.GetCustomerProgramById(this.bookingApi, this.layout == 'portal' ? this.$route.params.id : this.$route.query.id)
	},
    beforeDestroy() {
		profileSvc = null
	}
}
</script>