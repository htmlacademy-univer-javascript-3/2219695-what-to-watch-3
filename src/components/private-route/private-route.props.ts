import {AuthStatus} from '../app/const.ts';
import React from 'react';

export type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: React.JSX.Element;
}
