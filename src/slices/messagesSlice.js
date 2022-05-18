/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id } = payload;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      })
      .addCase(channelsActions.getData, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

const { actions, reducer } = messagesSlice;

export { actions };
export default reducer;
