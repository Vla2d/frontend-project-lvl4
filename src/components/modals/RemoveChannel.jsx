import React, { useContext, useState } from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import socketContext from '../../contexts/socketContext.jsx';
import { actions } from '../../slices/index.js';
import { getChannelWithActionId } from './selectors.js';

function RemoveChannel({ handleClose }) {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducers);
  const id = useSelector(getChannelWithActionId);
  const socket = useContext(socketContext);
  const { t } = useTranslation();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = async () => {
    try {
      setIsRemoving(true);
      await socket.removeChannel({ id });
      setIsRemoving(false);
      dispatch(actions.currentChannelIdUpdated(channels[0].id));
      toast.success(t('notifications.channelRemoved'));
      handleClose();
    } catch (err) {
      setIsRemoving(false);
      toast.error(t('notifications.connectionError'));
      throw err;
    }
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
          disabled={isRemoving}
        />
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('chat.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button disabled={isRemoving} className="me-2" variant="secondary" onClick={handleClose}>{t('buttons.cancel')}</Button>
          <Button disabled={isRemoving} variant="danger" onClick={handleDelete}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </>
  );
}

export default RemoveChannel;
