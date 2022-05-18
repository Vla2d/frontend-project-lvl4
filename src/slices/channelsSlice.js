/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    channelWithAction: null,
  },
  reducers: {
    getData: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    currentChannelIdUpdated: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    channelWithActionUpdated: (state, { payload }) => {
      state.channelWithAction = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id);
      state.currentChannelId = initialChannelId;
    },
    renameChannel: (state, { payload }) => {
      const channelIndex = state.channels.findIndex((c) => c.id === payload.id);
      const channel = state.channels[channelIndex];
      const newChannel = { ...channel, name: payload.name };
      state.channels[channelIndex] = newChannel;
    },
  },
});

const { actions, reducer } = channelsSlice;

export { actions };
export default reducer;
