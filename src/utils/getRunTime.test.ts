import {describe, expect, it} from 'vitest';
import {getRunTimePlayer} from './getRunTime.ts';

describe('getRunTime', () => {
  it('should return correct run time string with value minutes multiple 60 minutes', () => {
    const runTime = 120;
    const expectedRunTimeString = '2h 0m';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });

  it('should return correct run time string with value minutes not multiple 60 minutes', () => {
    const runTime = 121;
    const expectedRunTimeString = '2h 1m';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });

  it('should return correct run time string with zero minutes', () => {
    const runTime = 0;
    const expectedRunTimeString = '0h 0m';

    const result = getRunTimePlayer(runTime);

    expect(result).toBe(expectedRunTimeString);
  });
});
