import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import ChannelDropdownButton from './ChannelDropdownButton.jsx';
import { getChannels, getCurrentChannelId } from './selectors.js';
import { actions } from '../../../slices/index.js';

function ChannelsSidebar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const {
    openModal,
    currentChannelIdUpdated,
    channelWithActionUpdated,
  } = actions;

  const handleChangeChannel = (channelId) => () => {
    dispatch(currentChannelIdUpdated(channelId));
  };

  const handleAddChannel = (action) => () => { // addingChannel
    dispatch(openModal({ action, channelData: {} }));
  };

  const handleRemoveChannel = (id, name, action) => () => { // removingChannel
    dispatch(channelWithActionUpdated({ id, name }));
    dispatch(openModal({ action, channelData: { channelId: id } }));
  };

  const handleRenameChannel = (id, name, action) => () => { // renamingChannel
    dispatch(channelWithActionUpdated({ id, name }));
    dispatch(openModal({ action, channelData: { channelId: id } }));
  };

  const renderChannelsList = (channelsData) => {
    const renderGeneralButton = (id, name, isCurrentChannel) => {
      const classNameGeneralButton = classNames('w-100 rounded-0 text-start btn', { 'btn-secondary': isCurrentChannel });
      return (
        <button type="button" className={classNameGeneralButton} onClick={handleChangeChannel(id)}>
          <span className="me-1">#</span>
          {name}
        </button>
      );
    };

    const items = channelsData.map(({ id, name, removable }) => {
      const isCurrentChannel = currentChannelId === id;

      return (
        <li key={id} className="nav-item w-100">
          {removable ? (
            <ChannelDropdownButton
              id={id}
              name={name}
              isCurrentChannel={isCurrentChannel}
              handleChangeChannel={handleChangeChannel}
              handleRemoveChannel={handleRemoveChannel}
              handleRenameChannel={handleRenameChannel}
            />
          ) : renderGeneralButton(id, name, isCurrentChannel)}
        </li>
      );
    });

    return (
      <ul className="nav flex-column nav-pills nav-fill px-2">{items}</ul>
    );
  };

  return (
    <div className="col-4 col-md-2 border-right pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel('addingChannel')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {renderChannelsList(channels)}
    </div>
  );
}

export default ChannelsSidebar;
