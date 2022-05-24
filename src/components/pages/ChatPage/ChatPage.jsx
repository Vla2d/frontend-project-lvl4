import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ChannelsSidebar from './ChannelsSidebar.jsx';
import MessagesBlock from './MessagesBlock.jsx';
import { actions } from '../../../slices/index.js';
import authContext from '../../../contexts/authContext.jsx';
import { usersPath } from '../../../routes.js';

const { getData } = actions;

function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useContext(authContext);
  const headers = auth.getAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(usersPath(), { headers });

      dispatch(getData(data));
    };

    try {
      fetchData();
    } catch (err) {
      if (err.isAxiosError && !err.response) {
        toast.error(t('notifications.connectionError'));
        return;
      }

      toast.error(t('notifications.unknownError'));
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
