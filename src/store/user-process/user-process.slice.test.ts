import {userProcess} from './user-process.slice.ts';
import {AuthStatus} from '../../components/app/const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';
import {UserData} from '../../types/user-data.ts';
import {AuthData} from '../../types/auth-data.ts';

describe('UserProcess Slice', () => {
  const avatarUrl = 'avatarUrl';

  const userData: UserData = {
    name: 'TestName',
    avatarUrl,
    email: 'TestEmail',
    token: 'TestToken'
  };

  const authData: AuthData = {
    login: 'TestLogin',
    password: 'TestPassword'
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authStatus: AuthStatus.Auth, avatarUrl};

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {authStatus: AuthStatus.Unknown, avatarUrl: ''};

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {authStatus: AuthStatus.NoAuth, avatarUrl: ''};
    const expectedState = {authStatus: AuthStatus.Auth, avatarUrl};

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(userData, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {authStatus: AuthStatus.Auth, avatarUrl};
    const expectedState = {authStatus: AuthStatus.NoAuth, avatarUrl};

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {authStatus: AuthStatus.NoAuth, avatarUrl};
    const expectedState = {authStatus: AuthStatus.Auth, avatarUrl};

    const result = userProcess.reducer(initialState, loginAction.fulfilled(userData, '', authData));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {authStatus: AuthStatus.Auth, avatarUrl};
    const expectedState = {authStatus: AuthStatus.NoAuth, avatarUrl};

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {authStatus: AuthStatus.Auth, avatarUrl};
    const expectedState = {authStatus: AuthStatus.NoAuth, avatarUrl};

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
