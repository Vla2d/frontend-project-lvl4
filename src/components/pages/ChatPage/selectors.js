export const getCurrentChannelName = (state) => {
  const { channels, currentChannelId } = state.channelsReducers;
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  return currentChannel?.name;
};

export const getMessagesForCurrentChannel = (state) => {
  const { messages } = state.messagesReducers;
  const { currentChannelId } = state.channelsReducers;
  return messages
    .filter((message) => message.channelId === currentChannelId);
};

export const getCurrentChannelId = (state) => {
  const { currentChannelId } = state.channelsReducers;
  return currentChannelId;
};

export const getChannels = (state) => {
  const { channels } = state.channelsReducers;
  return channels;
};

export const getModalData = (state) => {
  const { modalReducers } = state;
  return modalReducers;
};
