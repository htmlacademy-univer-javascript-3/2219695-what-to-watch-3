import {describe, expect, it} from 'vitest';
import {getDate} from './getDate.ts';

describe('getDate', () => {
  it('should return correct date string with value YYYY-MM-DDTHH:mm:ss.sssZ format', () => {
    const date = '2023-05-25T12:00:00.000Z';
    const expectedDateString = 'May 25, 2023';

    const result = getDate(date);

    expect(result).toBe(expectedDateString);
  });
});
