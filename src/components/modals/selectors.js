export const getChannelsNames = (state) => {
  const { channels } = state.channelsReducers;
  const channelsNames = channels.map((channel) => channel.name);
  return channelsNames;
};

export const getChannelWithActionId = (state) => state.modalReducers.modalChannelId;

export const getPreviousChannelName = (state) => {
  const { channelWithAction } = state.channelsReducers;
  return channelWithAction.name;
};

export const getModalData = (state) => {
  const { modalReducers } = state;
  return modalReducers;
};
