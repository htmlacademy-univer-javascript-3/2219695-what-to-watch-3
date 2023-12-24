import {AuthStatus, NameSpace} from '../../components/app/const.ts';
import {UserProcess} from '../../types/state.ts';
import {getAuthCheckedStatus, getAuthStatus, getAvatarUrl, getCheckedLogin} from './user-process.selectors.ts';

describe('UserProcess selectors', () => {
  const avatarUrl = 'avatarUrl';

  it('should return authorization status from state', () => {
    const authStatus = AuthStatus.Auth;
    const state: UserProcess = {authStatus, avatarUrl};

    const result = getAuthStatus({ [NameSpace.User]: state });

    expect(result).toBe(authStatus);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const authStatus = AuthStatus.Auth;
    const state: UserProcess = {authStatus, avatarUrl};

    const result = getAuthCheckedStatus({ [NameSpace.User]: state });

    expect(result).toBe(true);
  });

  it('should return "true" because user is login', () => {
    const authStatus = AuthStatus.Auth;
    const state: UserProcess = {authStatus, avatarUrl};

    const result = getCheckedLogin({ [NameSpace.User]: state });

    expect(result).toBe(true);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const authStatus = AuthStatus.Unknown;
    const state: UserProcess = {authStatus, avatarUrl};

    const result = getAuthCheckedStatus({ [NameSpace.User]: state });

    expect(result).toBe(false);
  });

  it('should return avatarUrl', () => {
    const authStatus = AuthStatus.Auth;
    const state: UserProcess = {authStatus, avatarUrl};

    const result = getAvatarUrl({ [NameSpace.User]: state });

    expect(result).toBe('avatarUrl');
  });
});
