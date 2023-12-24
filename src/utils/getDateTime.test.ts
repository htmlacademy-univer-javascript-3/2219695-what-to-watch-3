import {describe, expect, it} from 'vitest';
import {getDateTime} from './getDateTime.ts';

describe('getDateTime', () => {
  it('should return first part of the date before separator T', () => {
    const date = '2023-05-25T12:00:00.000Z';
    const expectedDateTime = '2023-05-25';

    const result = getDateTime(date);

    expect(result).toBe(expectedDateTime);
  });
});
