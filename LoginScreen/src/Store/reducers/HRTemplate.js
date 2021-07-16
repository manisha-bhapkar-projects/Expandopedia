import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "lodash";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import { notifyAction } from "./notification";

export const getAllDocumentList = createAsyncThunk(
    "HRTemplate/getAllDocumentList",
    async (payload = {}) => {
      let res = await fetchClient
        .get(`${constants.API.HR_TEMPLATE.GET_ALL_DOCUMENT_LIST}`, {
          params: {
            page: payload.page,
            pageSize : payload.pageSize,
            languageIds: payload.languageIds?.map((x) => x).join(","),
            countryIds: payload.countryIds?.map((x) => x).join(","),
            categorIds: payload.categorIds?.map((x) => x).join(",")
          },
        })
        .then((res) => res.data)
        .catch(console.error);
      return res;
    }
  );

  export const getCartDetails = createAsyncThunk(
    "HRTemplate/getCartDetails",
    async (payload = {}) => {
      let res = await fetchClient
        .get(`${constants.API.HR_TEMPLATE.GET_CART_DETAILS}${payload.userId}`)
        .then((res) => res.data)
        .catch(console.error);
      return res;
    }
  );
  export const getLanguageList = createAsyncThunk(
    "HRTemplate/getLanguageList",
    async (payload = {}) => {
      let res = await fetchClient
        .get(`${constants.API.HR_TEMPLATE.GET_LANGUAGE_LIST}`,{
        })
        .then((res) => res.data)
        .catch(console.error);
      return res;
    }
  );

  export const getCategoryList = createAsyncThunk(
    "HRTemplate/getCategoryList",
    async (payload = {}) => {
      let res = await fetchClient
        .get(`${constants.API.HR_TEMPLATE.GET_ALL_CATEGORY_LIST}`,{
        })
        .then((res) => res.data)
        .catch(console.error);
      return res;
    }
  );

const HRTemplate = createSlice({
  name: "HRTemplate",
  initialState: {
    documentList: [],
    cartDetails:{},
    languageList:[],
    categoryList:[]
  },
  reducers: {
  
  },
  extraReducers: {
      [getAllDocumentList.pending]: (state, action) => {
        state.docListLoading = true;
      },
      [getAllDocumentList.fulfilled]: (state, action) => {
        state.docListLoading = false;
        state.documentList = action.payload?.data || [];
      },
      [getCartDetails.fulfilled]: (state, action) => {
        state.cartDetails = action.payload?.data || [];
      },
      [getLanguageList.fulfilled]: (state, action) => {
        state.languageList = action.payload?.data || [];
      },
      [getCategoryList.fulfilled]: (state, action) => {
        state.categoryList = action.payload?.data || [];
      },
      
  },
});

function download(arrayBuffer, type) {
  var blob = new Blob([arrayBuffer], { type: type });
  var url = URL.createObjectURL(blob);
  window.open(url);
}
export default HRTemplate.reducer;
