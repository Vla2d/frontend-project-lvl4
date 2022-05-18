/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    modalType: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.modalType = payload;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.modalType = null;
    },
  },
});

const { actions, reducer } = modalSlice;

export { actions };
export default reducer;
