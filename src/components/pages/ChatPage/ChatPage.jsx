import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsSidebar from './ChannelsSidebar.jsx';
import MessagesBlock from './MessagesBlock.jsx';
import { actions } from '../../../slices/index.js';
import { useAuth } from '../../../hooks/index.js';
import { usersPath } from '../../../routes.js';

const { getData } = actions;

function MainPage() {
  const auth = useAuth();

  const headers = auth.getAuthHeader();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    let isActive = true;
    const fetchData = async () => {
      const { data } = await axios.get(usersPath(), { headers });
      if (isActive) {
        dispatch(getData(data));
      }
    };

    fetchData()
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isActive = false;
    };
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
