import {State} from '../../types/state.ts';
import {AuthStatus, NameSpace} from '../../components/app/const.ts';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthStatus => state[NameSpace.User].authStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authStatus !== AuthStatus.Unknown;
export const getCheckedLogin = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authStatus === AuthStatus.Auth;
export const getAvatarUrl = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].avatarUrl;
