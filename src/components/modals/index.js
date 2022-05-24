import CreateChannel from './CreateChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  addingChannel: CreateChannel,
  removingChannel: RemoveChannel,
  renamingChannel: RenameChannel,
};

const getModal = (modalType) => modals[modalType];

export default getModal;
