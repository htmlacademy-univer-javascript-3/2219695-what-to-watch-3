import {AuthStatus} from '../app/const.ts';
import {JSX} from 'react';

export type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}
