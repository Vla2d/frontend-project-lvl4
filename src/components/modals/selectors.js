export const getChannelsNames = (state) => {
  const { channels } = state.channelsReducers;
  const channelsNames = channels.map((channel) => channel.name);
  return channelsNames;
};

export const getChannelWithActionId = (state) => state.modalReducers.modalChannel.id;

export const getPreviousChannelName = (state) => {
  const { modalChannel } = state.modalReducers;
  return modalChannel.name;
};

export const getModalData = (state) => {
  const { modalReducers } = state;
  return modalReducers;
};
