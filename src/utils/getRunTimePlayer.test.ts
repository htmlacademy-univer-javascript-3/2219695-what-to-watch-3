import {describe, expect, it} from 'vitest';
import {getRunTimePlayer} from './getRunTimePlayer.ts';

describe('getRunTimePlayer', () => {
  it('should return correct run time string with value minutes multiple 60 minutes', () => {
    const runTime = 120;
    const expectedRunTimeString = '2:0';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });

  it('should return correct run time string with value minutes not multiple 60 minutes', () => {
    const runTime = 121;
    const expectedRunTimeString = '2:1';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });

  it('should return correct run time string with zero minutes', () => {
    const runTime = 0;
    const expectedRunTimeString = '0:0';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });
});
