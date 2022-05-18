export const getChannelsNames = (state) => {
  const { channels } = state.channelsReducers;
  const channelsNames = channels.map((channel) => channel.name);
  return channelsNames;
};

export const getChannelWithActionId = (state) => {
  const { id } = state.channelsReducers.channelWithAction;
  return id;
};

export const getPreviousChannelName = (state) => {
  const { channelWithAction } = state.channelsReducers;
  return channelWithAction.name;
};
