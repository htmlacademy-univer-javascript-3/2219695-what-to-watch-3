import {JSX} from 'react';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {Navigate} from 'react-router-dom';

export type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute({authStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}
