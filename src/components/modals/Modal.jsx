import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/index.js';
import { getModalData } from './selectors.js';
import getModal from './index.js';

function Modal() {
  const dispatch = useDispatch();
  const { isOpened, modalType } = useSelector(getModalData);
  if (modalType === null) {
    return null;
  }
  const SelectedModal = getModal(modalType);

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  return (
    <BootstrapModal backdrop="static" show={isOpened} onHide={handleClose} centered>
      {SelectedModal && <SelectedModal handleClose={handleClose} />}
    </BootstrapModal>
  );
}

export default Modal;
