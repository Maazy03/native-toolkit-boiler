import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AuthStack from './authStack';
import AppStack from './appStack';

const AppNavigator = () => {
  const auth = useSelector(state => state.auth);
  let isLogin = auth?.isAuth;

  return isLogin ? <AppStack /> : <AuthStack />;
};
export default AppNavigator;
