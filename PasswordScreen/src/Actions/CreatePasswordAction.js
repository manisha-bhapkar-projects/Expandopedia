import constants from "../utils/constants";
import fetchClient  from "../utils/axiosConfig";
import axios from "axios";



export const callCreatePasswordAPI = (activationCode) => {
    return (_dispatch, _getState) => {
      return axios.get(`${constants.API.PASSWORD.CREATE_PASSWORD}`,
       {
        params: {
            "activationCode": activationCode
        },
      });
    };
  };

  export const callSetUserProfileAPI = (data) => {
    console.log("profile data", data);
    return (_dispatch, _getState) => {
      return axios.post(`${constants.API.PASSWORD.SET_USER_PROFILE}`, 
      data
      );
    };
  };

 