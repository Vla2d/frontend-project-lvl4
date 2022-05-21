import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChannelsSidebar from './ChannelsSidebar.jsx';
import MessagesBlock from './MessagesBlock.jsx';
import { actions } from '../../../slices/index.js';
import { useAuth } from '../../../hooks/index.js';
import { usersPath } from '../../../routes.js';

const { getData } = actions;

function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const headers = auth.getAuthHeader();

  useEffect(() => {
    try {
      axios.get(usersPath(), { headers })
        .then((res) => dispatch(getData(res.data)));
    } catch (err) {
      if (err.isAxiosError) {
        toast.error(t('notifications.connectionError'));
      }

      throw err;
    }
  }, [auth, headers, dispatch, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsSidebar />
        <MessagesBlock />
      </div>
    </div>
  );
}

export default MainPage;
