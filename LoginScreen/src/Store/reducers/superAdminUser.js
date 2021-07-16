import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomeNotification } from "../../Components/CustomeNotification/CustomeNotification";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";

export const callAddSuperAdminUser = createAsyncThunk(
  "superAdminUserReducer/callAddSuperAdminUser",
  async (payload = {}, reduxInfo) => {
    let res = await fetchClient
      .post(
        `${constants.API.SUPER_ADMIN_USER.ADD_SUPER_ADMIN}`,
        payload.initialValues
      )
      .then((res) => {
        payload.notify("User Added Successfully");
        payload.history.push(constants.ROUTE.SIDEBAR.SETTINGS.USERLIST);
        return res.data;
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          const m = error.response.data.errors;
          const message = m.join(",");
          payload.notify(message, 5000);
        }
      });
    return res;
  }
);

export const callgetAdministratorRole = createAsyncThunk(
  "superAdminUserReducer/callgetAdministratorRole",
  async () => {
    let res = await fetchClient
      .get(`${constants.API.SUPER_ADMIN_USER.GET_ADMINISTRATOR_ROLE}`)
      .then((res) => res)
      .catch(console.error);
    return res;
  }
);

export const callgetCompanyList = createAsyncThunk(
  "superAdminUserReducer/callgetCompanyList",
  async () => {
    let res = await fetchClient
      .get(`${constants.API.USER.GET_COMPANY_LIST}`)
      .then((res) => res.data)
      .catch(console.error);
    return res;
  }
);

export const callgetUserList = createAsyncThunk(
  "superAdminUserReducer/callgetUserList",
  async (payload = {}) => {
    let res = await fetchClient
      .get(`${constants.API.SUPER_ADMIN_USER.GET_USER_LIST}`, {
        params: {
          page: payload.pageNumber,
          pageSize: payload.pageSize,
          roleId: payload.roleId,
          sortby: payload.sortField,
          sortbydesc: payload.sortOrder,
        },
      })
      .then((res) => res.data)
      .catch(console.error);
    return res;
  }
);

export const callUpdateSuperAdminUser = createAsyncThunk(
  "superAdminUserReducer/callUpdateSuperAdminUser",
  async (payload = {}, reduxInfo) => {
    let res = await fetchClient
      .put(
        `${constants.API.SUPER_ADMIN_USER.UPDATE_SUPER_ADMIN}${payload.id}`,
        payload.request
      )
      .then((res) => {
        payload.notify("User Updated Successfully");
        reduxInfo.dispatch(
          callChangeUserStatusAPI({
            id: payload.id,
            statusFlag: true,
            history: payload.history,
          })
        );
        return res.data;
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          const m = error.response.data.errors;
          const message = m.join(",");
          payload.notify(message, 5000);
        }
      });
    return res;
  }
);

export const callgetSpecificUserDetails = createAsyncThunk(
  "superAdminUserReducer/callgetSpecificUserDetails",
  async (payload = {}) => {
    let res = await fetchClient
      .get(`${constants.API.SUPER_ADMIN_USER.UPDATE_SUPER_ADMIN}${payload.id}`)
      .then((res) => res.data)
      .catch(console.error);
    return res;
  }
);

export const callsendEmailToActiateUser = createAsyncThunk(
  "superAdminUserReducer/callsendEmailToActiateUser",
  async (payload = {}) => {
    let res = await fetchClient
      .post(`${constants.API.SUPER_ADMIN_USER.SEND_EMAIL_TO_CHANGE_STATUS}`, {
        EmailId: payload.EmailId,
        ActivationCode: payload.ActivationCode,
      })
      .then((res) => res)
      .catch(console.error);
    return res;
  }
);

export const callChangeUserStatusAPI = createAsyncThunk(
  "superAdminUserReducer/callChangeUserStatusAPI",
  async (payload = {}, reduxInfo) => {
    let res = await fetchClient
      .put(
        `${constants.API.SUPER_ADMIN_USER.CHANGE_USER_STATUS}${payload.id}?active=${payload.statusFlag}`
      )
      .then((res) => {
        if (payload.userLIstRequestObject)
          reduxInfo.dispatch(callgetUserList(payload.userLIstRequestObject));
        else payload.history.push(constants.ROUTE.SIDEBAR.SETTINGS.USERLIST);
        return res.data;
      })
      .catch(console.error);
    return res;
  }
);

const superAdminUser = createSlice({
  name: "superAdminUserReducer",
  initialState: {
    userList: [],
    administratorRole: [],
    userDetails: {},
    emailStatus: "",
    updateUser: {},
  },
  reducers: {},
  extraReducers: {
    [callgetUserList.pending]: (state, action) => {
      state.userListLoading = true;
    },
    [callgetUserList.fulfilled]: (state, action) => {
      state.userListLoading = false;
      state.userList = action.payload?.data || [];
    },
    [callgetAdministratorRole.fulfilled]: (state, action) => {
      state.administratorRole = action.payload?.data?.data || [];
    },
    [callgetCompanyList.fulfilled]: (state, action) => {
      state.companyList = action.payload?.data?.data || [];
    },
    [callgetSpecificUserDetails.fulfilled]: (state, action) => {
      console.log("callgetSpecificUserDetails", action.payload?.data);
      state.userDetails = action.payload?.data || [];
    },
    [callAddSuperAdminUser.fulfilled]: (state, action) => {
      state.addUser = action.payload || [];
    },
    [callsendEmailToActiateUser.fulfilled]: (state, action) => {
      state.emailStatus = action.payload?.data || [];
    },
    [callUpdateSuperAdminUser.fulfilled]: (state, action) => {
      state.updateUser = action.payload?.data || [];
    },
  },
});

export default superAdminUser.reducer;
