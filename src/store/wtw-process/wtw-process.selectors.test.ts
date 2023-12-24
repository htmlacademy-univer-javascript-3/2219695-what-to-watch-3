import {describe, expect, it} from 'vitest';
import {NameSpace} from '../../components/app/const.ts';
import {getGenre} from './wtw-process.selectors.ts';
import {Genre} from '../../types/genre.ts';

describe('WtwProcess selectors', () => {
  const state = {
    [NameSpace.Wtw]: {
      genre: 'All genres' as Genre
    }
  };

  it('should return genre from state', () => {
    const {genre} = state[NameSpace.Wtw];

    const result = getGenre(state);

    expect(result).toBe(genre);
  });
});
