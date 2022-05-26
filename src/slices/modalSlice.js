/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  modalType: null,
  modalChannel: {
    name: null,
    id: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.modalType = payload.action;
      state.modalChannel.name = payload.channelData.name;
      state.modalChannel.id = payload.channelData.id;
    },
    closeModal: (state) => {
      const { isOpened, modalType, modalChannel } = initialState;
      state.isOpened = isOpened;
      state.modalType = modalType;
      state.modalChannel.name = modalChannel.name;
      state.modalChannel.id = modalChannel.id;
    },
  },
});

const { actions, reducer } = modalSlice;

export { actions };
export default reducer;
