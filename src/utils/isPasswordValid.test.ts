import {isPasswordValid} from './isPasswordValid.ts';

describe('isPasswordValid', () => {
  it('should return true if password valid', () => {
    const login = 'test123';

    const result = isPasswordValid(login);

    expect(result).toBe(true);
  });

  it('should return false if password invalid (only letters)', () => {
    const login = 'test';

    const result = isPasswordValid(login);

    expect(result).toBe(false);
  });

  it('should return false if password invalid (only numbers)', () => {
    const login = '123';

    const result = isPasswordValid(login);

    expect(result).toBe(false);
  });
});
