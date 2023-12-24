import {describe, expect, it} from 'vitest';
import {getTimeLeft} from './getTimeLeft.ts';

describe('getTimeLeft', () => {
  it('should return correct timeLeftString if video duration is less than hour', () => {
    const secondCount = 100;
    const expectedDateString = '-01:40';

    const result = getTimeLeft(secondCount);

    expect(result).toBe(expectedDateString);
  });

  it('should return correct timeLeftString if video duration is more than hour', () => {
    const secondCount = 4000;
    const expectedDateString = '-01:06:40';

    const result = getTimeLeft(secondCount);

    expect(result).toBe(expectedDateString);
  });
});
