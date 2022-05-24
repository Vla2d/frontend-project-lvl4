/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  modalType: null,
  modalChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.modalType = payload.action;
      state.modalChannelId = payload.channelData.channelId;
    },
    closeModal: (state) => {
      const { isOpened, modalType, modalChannelId } = initialState;
      state.isOpened = isOpened;
      state.modalType = modalType;
      state.modalChannelId = modalChannelId;
    },
  },
});

const { actions, reducer } = modalSlice;

export { actions };
export default reducer;
