import {State} from '../../types/state.ts';
import {AuthStatus, NameSpace} from '../../components/app/const.ts';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authStatus !== AuthStatus.Unknown;
export const getCheckedLogin = (state: State): boolean => state[NameSpace.User].authStatus === AuthStatus.Auth;
