import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import { useFormik } from 'formik';
import {
  Modal,
  Form,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socketContext from '../../contexts/socketContext.jsx';
import { getChannelsNames, getPreviousChannelName, getChannelWithActionId } from './selectors.js';

function RenameChannel({ handleClose }) {
  const channelsNames = useSelector(getChannelsNames);
  const prevChannelName = useSelector(getPreviousChannelName);
  const id = useSelector(getChannelWithActionId);
  const { t } = useTranslation();
  const renameInputRef = useRef(null);
  const socket = useContext(socketContext);
  const [isRenaming, setIsRenaming] = useState(false);

  useEffect(() => {
    renameInputRef.current.focus();
    renameInputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: prevChannelName,
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      try {
        setIsRenaming(true);
        await socket.renameChannel({ id, name });
        setIsRenaming(false);
        toast.success(t('notifications.channelRenamed'));
        resetForm('');
        handleClose();
      } catch (err) {
        setIsRenaming(false);
        toast.error(t('notifications.connectionError'));
        throw err;
      }
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
          disabled={isRenaming}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              className="mb-2"
              name="name"
              aria-label={t('chat.channelName')}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={renameInputRef}
              isInvalid={formik.errors.name}
            />
            <div className="invalid-feedback">{formik.errors.name && t('errors.channelNameUniqueness')}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
                disabled={isRenaming}
              >
                {t('buttons.cancel')}
              </button>
              <Button type="submit" disabled={isRenaming}>{t('buttons.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
}

export default RenameChannel;
