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
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import socketContext from '../../contexts/socketContext.jsx';
import { actions } from '../../slices/index.js';
import { getChannelsNames } from './selectors.js';

function CreateChannel({ handleClose }) {
  const addInputRef = useRef(null);
  const socket = useContext(socketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNames = useSelector(getChannelsNames);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    addInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.mixed().notOneOf(channelsNames),
    }),
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsCreating(true);
        const newChannel = { name: values.name };
        const channel = await socket.addChannel(newChannel);
        setIsCreating(false);
        dispatch(actions.currentChannelIdUpdated(channel.id));
        toast.success(t('notifications.channelAdded'));
        resetForm('');
        handleClose();
      } catch (err) {
        setIsCreating(false);
        toast.error(t('notifications.connectionError'));
        throw err;
      }
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
        <button
          aria-label="Close"
          data-bs-dismiss="modal"
          type="button"
          className="btn btn-close"
          onClick={handleClose}
          disabled={isCreating}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-group">
            <FormControl
              className="mb-2"
              name="name"
              aria-label={t('chat.channelName')}
              placeholder={t('chat.channelName')}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={addInputRef}
              isInvalid={formik.errors.name}
            />
            <div className="invalid-feedback">{formik.errors.name && t('errors.channelNameUniqueness')}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
                disabled={isCreating}
              >
                {t('buttons.cancel')}
              </button>
              <Button type="submit" disabled={isCreating}>{t('buttons.send')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
}

export default CreateChannel;
