import {describe, expect, it} from 'vitest';
import {getRating} from './getRating.ts';

describe('getRating', () => {
  it('should return "Awesome" with rating value 10', () => {
    const rating = 10;

    const result = getRating(rating);

    expect(result).toBe('Awesome');
  });

  it('should return "Very good" with rating value > 8', () => {
    const rating = 9;

    const result = getRating(rating);

    expect(result).toBe('Very good');
  });

  it('should return "Good" with rating value > 5', () => {
    const rating = 6;

    const result = getRating(rating);

    expect(result).toBe('Good');
  });

  it('should return "Normal" with rating value > 3', () => {
    const rating = 4;

    const result = getRating(rating);

    expect(result).toBe('Normal');
  });

  it('should return "Bad" with rating value <= 3', () => {
    const rating = 2;

    const result = getRating(rating);

    expect(result).toBe('Bad');
  });
});
