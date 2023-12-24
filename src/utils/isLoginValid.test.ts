import {describe, expect, it} from 'vitest';
import {isLoginValid} from './isLoginValid.ts';

describe('isLoginValid', () => {
  it('should return true if login valid', () => {
    const login = 'test@mail.ru';

    const result = isLoginValid(login);

    expect(result).toBe(true);
  });

  it('should return false if login invalid', () => {
    const login = 'name';

    const result = isLoginValid(login);

    expect(result).toBe(false);
  });
});
