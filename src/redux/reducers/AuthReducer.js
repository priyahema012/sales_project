// src/redux/reducers/AuthReducers.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  token: "",
  search: {},
  showAddModal: false,
  showDeleteModal: false,
  showUpdateModal: false,
  userId: null,
  username: "",
  reset_key: "",
  otp: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload;
    },
    handleCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
    handleShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    handleShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    handleShowUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload;
    },
    handleUserId: (state, action) => {
      state.userId = action.payload;
    },
    handledeleteds: (state, action) => {
      state.delete = action.payload;
    },
    deletehandlefilter: (state) => {
      state.search = {};  // This will reset the search filter
    },
    handleUserName: (state, action) => {
      state.username = action.payload;
    },
    handleResetKey: (state, action) => {
      state.reset_key = action.payload;
    },
    handleOtp: (state, action) => {
      state.otp = action.payload;
    },
    handleEnquiryListData: (state,action) => {
      state.enquiryListData = action.payload
    },
    handleRequirementsList: (state,action) => {
      state.requirementsList = action.payload
    },

  },
});

export const {
  handleLogin,
  handleCategoryList,
  handleSearch,
  handleShowAddModal,
  handleShowDeleteModal,
  handleShowUpdateModal,
  handleUserId,
  handledeleteds,
  deletehandlefilter,
  handleUserName,
  handleResetKey,
  handleEnquiryListData,
  handleOtp,
  handleRequirementsList
} = authSlice.actions;

export default authSlice.reducer;
