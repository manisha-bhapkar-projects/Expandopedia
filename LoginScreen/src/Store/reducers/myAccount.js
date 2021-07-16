import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import { notifyAction } from "./notification";

export const callgetUserProfileDetailsAPI = createAsyncThunk(
  "myAccountReducer/callgetUserProfileDetailsAPI",
  async (payload = {}) => {
    if (payload.success) {
      return {};
    } else {
      let res = await fetchClient
        .get(`${constants.API.USER.GET_USER_PROFILE}${payload.id}`)
        .then((res) => res.data)
        .catch((error) => {
          if (error?.response?.data?.message) {
            let result = error.response.data?.message;
            if (result != "") {
              throw result;
            }
          }
        });
      return res;
    }
  }
);

export const callUploadProfilePicAPI = createAsyncThunk(
  "myAccountReducer/callUploadProfilePicAPI",
  async (payload = {}) => {
    if (payload.success) {
      return {};
    } else {
    let res = await fetchClient
      .post(`${constants.API.USER.UPLOAD_PROFILE_PIC}`, payload.data)
      .then((res) => res.data)
      .catch(console.error);
    return res;
  }
}
);

export const callUpdateUserProfileAPI = createAsyncThunk(
  "myAccountReducer/callUpdateUserProfileAPI",
   async (payload = {}, reduxInfo) => {
      let res = await fetchClient
        .put(
          `${constants.API.USER.UPDATE_USER_PROFILE}${payload.userId}`,
          payload.data
        )
        .then((res) => res.data)
        .catch((error) => {
        if (error?.response?.data?.errors?.length > 0) {
          return reduxInfo.dispatch(
            notifyAction({ message: error?.response?.data?.errors[0] })
          );
        }
        });
      return res;
    }
  
);

export const callDeleteProfilePic = createAsyncThunk(
  "favoriteCountriesReducer/callDeleteProfilePic",
  async (payload = {}, reduxInfo) => {
  if(payload.success){
    return false;
  }
  else{
    let res = await fetchClient
    .delete(`${constants.API.USER.DELETE_PROFILE_PIC}${payload.image}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error?.response?.data?.errors?.length > 0) {
        return reduxInfo.dispatch(
          notifyAction({ message: error?.response?.data?.errors[0] })
        );
      }
    });
  return res;
  }
  }
);
const myAccount = createSlice({
  name: "myAccountReducer",
  initialState: {
    userDetails: {},
    imageURL: "",
  },
  reducers: {},
  extraReducers: {
    [callgetUserProfileDetailsAPI.fulfilled]: (state, action) => {
      state.userDetails = action.payload?.data || [];
    },
    [callUploadProfilePicAPI.pending]: (state, action) => {
      state.isLoading = true;
    },
    [callUploadProfilePicAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profilePicSuccess = true;
      state.imageURL = action.payload?.data || [];
    },
    [callUpdateUserProfileAPI.fulfilled]: (state, action) => {
      state.profileUpdate = action?.payload?.responseCode || undefined;
    },

    [callUpdateUserProfileAPI.rejected]: (state, action) => {
      state.profileUpdateError = action?.error?.message || undefined;
    },
    [callDeleteProfilePic.fulfilled]: (state, action) => {
      state.profilePicDeleted = action?.payload?.responseCode || undefined;
    },
    [callDeleteProfilePic.rejected]: (state, action) => {
      state.profilePicError = action?.error?.message || undefined;
    },
  },
});

export default myAccount.reducer;
