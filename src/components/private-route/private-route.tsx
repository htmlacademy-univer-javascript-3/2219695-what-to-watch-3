import React from 'react';
import {PrivateRouteProps} from './private-route.props.ts';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {Navigate} from 'react-router-dom';

export default function PrivateRoute({authStatus, children}: PrivateRouteProps): React.JSX.Element {
  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
