import React, { useEffect, useRef } from 'react';
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
import { useSocket } from '../../hooks/index.js';
import { getChannelsNames, getPreviousChannelName, getChannelWithActionId } from './selectors.js';

function RenameChannel({ handleClose }) {
  const channelsNames = useSelector(getChannelsNames);
  const prevChannelName = useSelector(getPreviousChannelName);
  const id = useSelector(getChannelWithActionId);

  const renameInputRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    renameInputRef.current.focus();
    renameInputRef.current.select();
  }, []);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: prevChannelName,
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      resetForm('');
      await socket.renameChannel({ id, name });
      handleClose();
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
              >
                {t('buttons.cancel')}
              </button>
              <Button type="submit" disabled={formik.isSubmitting}>{t('buttons.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
}

export default RenameChannel;
