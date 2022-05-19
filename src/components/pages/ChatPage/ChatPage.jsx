import React, { useEffect, useState } from 'react';
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

  const [active, setActive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(usersPath(), { headers });
      if (active) {
        dispatch(getData(data));
      }
    };

    fetchData()
      .catch((err) => {
        console.log(err);
        toast.error(t('notifications.connectionError'));
      });

    return () => {
      setActive(false);
    };
  }, [auth, headers, dispatch, t, active]);

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
