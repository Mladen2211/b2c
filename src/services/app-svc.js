import { axiosLoader } from "@fixit/utils";

async function loadModules() {
  if (process.client && window) {
    await axiosLoader();
  }
}

/**
 * IMPORTANT!!
 * Service requires the parent application using the components to have it's axios instance correctly set up.
 */
import { User } from "../models/index";

export default async function ($axios) {
  if (!$axios) {
    await loadModules();
  }
  const _axios = $axios ? $axios : window.axios ? window.axios : null;

  const AppSvc = {
    /**
     * Fetches the currently logged in user
     *
     * @param baseUrl - axios endpoint url
     * @returns {User}
     */
    async getCurrentUser(baseUrl) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/authorization/GetCurrentFixitNoUser`
        ).then(res => {
          result = res
        })
          .catch(function (error) {
            console.log("Failed: ", e, result);
          });
        if (result.data && result.data.responseCode === 200) {
          return new User(result.data.dto);
        }
      } catch (e) {

      }
      return true;
    },

    /**
     * Logs out user
     *
     * @param baseUrl - axios endpoint url
     * @returns {Boolean}
     */
    async Logout(baseUrl) {
      let result;
      try {
        _axios.defaults.headers.common["Authorization"] = "";
        result = await _axios.post(
          baseUrl + `/api/v2/Authorization/logout`,
          { origin: 'fixitno' },
          { withCredentials: true }
        );
        if (result.data && result.data.responseCode === 200) {
          return new User(result.data.dto);
        }
      } catch (e) {
        console.log("Failed: ", e);
      }
      return true;
    },

    /**
     * Logs in user
     *
     * @param baseUrl - axios endpoint url
     * @param data - login credentials
     * @returns {Boolean} true/false
     * 
     * @deprecated - 
     * [#1] since version 1.1.0 [#2]
     * [#3] will be copletly removed in version 2.0.0
     * [#4] if a pure login is needed please implement it on your own
     * [#5] this behavior will be included in VerifyLoginStep/VerifySignupStep so we can cover all cases
     * @see VerifyLoginStep
     */
    async Login(baseUrl, data) {
      let result;
      try {
        result = await _axios.post(
          `${baseUrl}/api/v2/Authorization/login?origin=fixitno`,
          data,
          { withCredentials: true }
        );
        if (result.data && result.data.responseCode === 200) {
          _axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.jwtToken}`;
        }
      } catch (e) {
        console.log("Failed: ", e);
      }
      return result;
    },

    /**
     * Logs in user with mobileCode
     *
     * @param baseUrl - axios endpoint url
     * @param data - login credentials
     * @returns { Boolean } true/false
     * 
     * @deprecated - 
     * [#1] since version 1.1.0 [#2]
     * [#3] will be copletly removed in version 2.0.0
     * [#4] similar behavior should not be used on its own since it could cause vurnebilities 
     * [#5] this behavior will be included in VerifyLoginStep/VerifySignupStep so we can cover all cases
     * 
     */
    async LoginByCode(baseUrl, data) {
      let result;
      try {
        result = await _axios.post(
          `${baseUrl}/api/v2/Authorization/login-by-code`,
          data,
          { withCredentials: true }
        );
        if (result.data && result.data.responseCode === 200) {
          _axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.jwtToken}`;
        }
      } catch (e) {
        console.log("Failed: ", e);
      }
      return result;
    },

    /**
     * Sends verification code via sms
     *
     * @param baseUrl - axios endpoint url
     * @param data - user credentials
     * @returns {Boolean}
     * 
     * 
     * @deprecated - 
     * [#1] since version 1.1.0 [#2]
     * [#3] will be copletly removed in version 2.0.0
     * [#4] similar behavior should not be used on its own since it could cause vurnebilities 
     * [#5] this behavior will be included in VerifyLoginStep/VerifySignupStep so we can cover all cases
     */
    async SendVerificationCode(baseUrl, data) {
      let result;
      try {
        result = await _axios.post(
          `${baseUrl}/api/v2/Authorization/send-code`,
          data,
          { withCredentials: true }
        );
      } catch (e) {
        console.log("Failed: ", e);
      }
      return result;
    },

    /**
     * Creates new customer and does an auto login
     *
     * @param baseUrl - axios endpoint url
     * @param data - user credentials
     * @returns {Boolean}
     * 
     * F
     * @deprecated - 
     * [#1] since version 1.1.0 [#2]
     * [#3] will be copletly removed in version 2.0.0
     * [#4] similar behavior should not be used on its own since it could cause vurnebilities 
     * [#5] this behavior will be included in VerifySignupStep so we can cover all cases
     */
    async CreateProfile(baseUrl, data) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}/api/v2/Authorization/create-portal-profile`,
          data
        );
      } catch (e) {
        console.log("Failed: ", e);
      }
      return response;
    },

    /**
     * Creates new customer and does an auto login
     *
     * @param baseUrl - axios endpoint url
     * @param data - user credentials
     * @returns {Boolean}
     */
    async UpdateProfile(baseUrl, data) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}/api/v2/Authorization/update-portal-profile`,
          data
        );
      } catch (e) {
        console.log("Failed: ", e);
      }
      return response;
    },

    /**
 * Creates new customer and does an auto login
 *
 * @param baseUrl - axios endpoint url
 * @param data - user credentials
 * @returns {Boolean}
 */
    async UpdateProfilePassword(baseUrl, data) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}/api/v2/Authorization/change-password`,
          data
        );
      } catch (e) {
        console.log("Failed: ", e);
      }
      return response;
    },


    /**
     * @public 
     * @async 
     * @function VerifyLoginStep
     * @param baseUrl - axios endpoint url
     * @param body Dictionary<string, string> contains fixed properties like username, isTpn, TpnChainId, TpnSiteId and needed data for specific step
     * @description Used to verify current step in the login process and returns nex stepp with required data.
     * @returns Returns the name of the next step in the process and additional data (if needed) for the next step
     * @since introduced in v1.1.0
     * @author Mladen Raguž
     * @todo Add recaptcha validation
     */
    async VerifyLoginStep(baseUrl, body) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}/api/v2/Authorization/verify-login-step`,
          body
        );
      } catch (e) {
        console.log("Failed: ", e);
      }
      return response;
    },


    //-----------------------------------------------------   NEW LOGIN   -----------------------------------------------------

    async verifySignupStep(baseUrl, payload) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}v2/Authorization/verify-signup-step`,
          payload
        );
      } catch (e) {
        console.log("Failed: ", e)
      }
      return response;
    },

    /**
     * @public 
     * @async 
     * @function VerifyAndLogin
     * @param baseUrl - axios endpoint url
     * @param body Dictionary<string, string> contains fixed properties like username, isTpn, TpnChainId, TpnSiteId and needed data for specific step
     * @description Used to verify email code in the vipps login process and logs the user in.
     * @returns Returns the name of the next step in the process and additional data (if needed) for the next step
     * @since introduced in v1.1.0
     * @author Mladen Raguž
     * @todo Add recaptcha validation
     */
    async VerifyAndLogin(baseUrl, body) {
      let response;
      try {
        response = await _axios.post(
          `${baseUrl}/api/v2/Vipps/verify-and-login`,
          body
        );
        // if (response.data && response.data.responseCode === 200 && response.data.dto.jwtToken) {
        //   _axios.defaults.headers.common[
        //     "Authorization"
        //   ] = `Bearer ${response.data.dto.jwtToken}`;
        // }
      } catch (e) {
        console.log("Failed: ", e);
      }
      return response;
    },
  };

  return AppSvc;
}
