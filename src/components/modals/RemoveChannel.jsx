import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/index.js';
import { actions } from '../../slices/index.js';
import { getChannelWithActionId } from './selectors.js';

function RemoveChannel({ handleClose }) {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducers);
  const id = useSelector(getChannelWithActionId);
  const socket = useSocket();

  const { t } = useTranslation();

  const handleDelete = async () => {
    dispatch(actions.currentChannelIdUpdated(channels[0].id));
    await socket.removeChannel({ id });
    toast.success(t('notifications.channelRemoved'));
    handleClose();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('chat.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={handleDelete}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </>
  );
}

export default RemoveChannel;
