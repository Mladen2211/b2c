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
import FavoriteEmployee from "../models/FavoriteEmployee";
import FavoriteProduct from "../models/FavoriteProduct"
import CustomerProgram from "../models/CustomerProgram"
import CustomerProgramWithHistory from "../models/CustomerProgramWithHistory";
import Order from '../models/Order'


export default async function ($axios) {
  if (!$axios) {
    await loadModules();
  }
  const _axios = $axios ? $axios : window.axios ? window.axios : null;

  const ProfileSvc = {

    /**--------------------------------------- UMBRACO  ---------------------------------------------**/

    /**
     * Fetch the user's favorite employees
     *
     * @param baseUrl - axios endpoint url
     * @returns {Object}
     */
    async GetUmbraco(baseUrl) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/Home/umbraco`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.dto
        }
      } catch (e) {

      }
      return [];
    },

    /**--------------------------------------- SALONS  ---------------------------------------------**/

    /**
     * Fetch the user's salons
     *
     * @param baseUrl - axios endpoint url
     * @param currentSiteId - Current site's Id
     * @param chainIds - chainIds
     * @param forceCreate - Boolean (defaults to false if not provided)
     * @returns {Object}
     */
    async GetMySalons(baseUrl, currentSiteId, chainIds, forceCreate) {
      let result;
      console.log(chainIds)
      try {
        await _axios.get(
          baseUrl + `/api/my-page/my-salons?currentSiteId=${currentSiteId}&chainIds=${chainIds}&forceCreate=${forceCreate}`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.chainList
        }
      } catch (e) {

      }
      return [];
    },

    /**
     * Updates the user's salons
     *
     * @param baseUrl - axios endpoint url
     * @param siteId - siteId to update
     * @param isFavorite - Boolean
     * @returns {Boolean}
     */
    async UpdateMySalons(baseUrl, siteId, isFavorite) {
      let result;
      try {
        await _axios.patch(
          baseUrl + `/api/my-page/my-salons/update`,
          { 
            'siteId': siteId,
            'isFavorite': isFavorite
          }
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return true
        }
      } catch (e) {

      }
      return false;
    },

    
    /**--------------------------------------- EMPLOYEES  ---------------------------------------------**/

    /**
     * Fetch the user's favorite employees
     *
     * @param baseUrl - axios endpoint url
     * @returns {FavoriteEmployee}
     */
    async GetFavoriteEmployees(baseUrl) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/favorites/employees`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.employeeList.map(emp => new FavoriteEmployee(emp));
        }
      } catch (e) {

      }
      return [];
    },

    /**
     * Updates the user's favorite employees
     *
     * @param baseUrl - axios endpoint url
     * @param employeeId - employeeId (string)
     * @returns {Boolean}
     */
    async UpdateFavoriteEmployee(baseUrl, employeeId) {
      let result;
      try {
        await _axios.post(
          baseUrl + `/api/my-page/favorites/employees/update`,
          { 'employeeId': employeeId }
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data) {
          return true
        }
      } catch (e) {

      }
      return false;
    },


    /**--------------------------------------- PRODUCTS  ---------------------------------------------**/

    /**
     * Fetch the user's favorite products
     *
     * @param baseUrl - axios endpoint url
     * @returns {FavoriteProduct}
     */
    async GetFavoriteProducts(baseUrl) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/favorites/products`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.array.map(emp => new FavoriteProduct(emp));
        }
      } catch (e) {

      }
      return [];
    },

    /**
     * Updates the user's favorite products
     *
     * @param baseUrl - axios endpoint url
     * @param productId - productId (string)
     * @returns {Boolean}
     */
    async UpdateFavoriteProduct(baseUrl, productId) {
      let result;
      try {
        await _axios.post(
          baseUrl + `/api/my-page/favorites/products/update`,
          { 'productId': productId }
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return true
        }
      } catch (e) {

      }
      return false;
    },


    /**--------------------------------------- CUSTOMER PROGRAMS  ---------------------------------------------**/

    /**
     * Fetch customer programs
     *
     * @param baseUrl - axios endpoint url
     * @param chainId - chain id (string)
     * @returns {CustomerProgram}
     */
    async GetCustomerPrograms(baseUrl, chainId) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/customer/program`, { params: { chainId: chainId }}
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.array.map(pr => new CustomerProgram(pr));
        }
      } catch (e) {
        console.warn(e)
      }
      return [];
    },

    /**
     * Fetch customer program by id
     *
     * @param baseUrl - axios endpoint url
     * @param customerProgramId - customer program id
     * @returns {CustomerProgram}
     */
    async GetCustomerProgramById(baseUrl, customerProgramId) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/customer/program/${customerProgramId}`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && (result.data.responseCode === 200 || result.data.responseCode == 204)) {
          return new CustomerProgramWithHistory(result.data.dto);
        }
      } catch (e) {
        console.warn(e)
      }
      return [];
    },

    /**
     * Updates the user's membership programs
     *
     * @param baseUrl - axios endpoint url
     * @returns {Boolean}
     */
    async AddOrRemoveCustomerProgram(baseUrl, customerProgramRequest) {
      let result;
      try {
        await _axios.post(
          baseUrl + `/api/my-page/customer/program/add-or-remove`, customerProgramRequest
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 202) {
          return true
        }
      } catch (e) {

      }
      return false;
    },


    /**--------------------------------------- Orders  ---------------------------------------------**/

    /**
     * Fetch customer programs
     *
     * @param baseUrl - axios endpoint url
     * @param chainId - chain id (string)
     * @returns {CustomerProgram}
     */
    async GetUserAppointments(baseUrl) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/appointments`
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.dto.map(x => new Order(x))
        }
      } catch (e) {
        console.warn(e)
      }
      return [];
    },


    /**--------------------------------------- CONSENTS  ---------------------------------------------**/

    /**
     * Fetch the user's consents
     *
     * @param baseUrl - axios endpoint url
     * @param tpnChainId - axios endpoint url
     * @param isTpn - axios endpoint url
     * @returns {Object}
     */
    async GetUserConsents(baseUrl, tpnChainId, isTpn) {
      let result;
      try {
        await _axios.get(
          baseUrl + `/api/my-page/customer/consent`, tpnChainId, isTpn
        ).then(res => {
          result = res
        })
        .catch(function (error) {
          console.log("Failed: ", e, result);
        });
        if (result.data && result.data.responseCode === 200) {
          return result.data.consentList;
        }
      } catch (e) {

      }
      return [];
    },

    /**
     * Updates the user's favorite products
     *
     * @param baseUrl - axios endpoint url
     * @param productId - productId (string)
     * @returns {Boolean}
     */
    // async UpdateFavoriteProduct(baseUrl, productId) {
    //   let result;
    //   try {
    //     await _axios.post(
    //       baseUrl + `/api/my-page/favorites/products/update`,
    //       { 'productId': productId }
    //     ).then(res => {
    //       result = res
    //     })
    //     .catch(function (error) {
    //       console.log("Failed: ", e, result);
    //     });
    //     if (result.data && result.data.responseCode === 200) {
    //       return true
    //     }
    //   } catch (e) {

    //   }
    //   return false;
    // },

  };

  
  return ProfileSvc;
}
