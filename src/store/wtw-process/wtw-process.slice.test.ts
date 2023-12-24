import {describe} from 'vitest';
import {setGenre, wtwProcess} from './wtw-process.slice.ts';
import {Genre} from '../../types/genre.ts';

describe('WtwProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {genre: 'All genres' as Genre};

    const result = wtwProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {genre: 'All genres' as Genre};

    const result = wtwProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set genre', () => {
    const initialState = {genre: 'All genres' as Genre};
    const expectedGenre = 'Comedy';

    const result = wtwProcess.reducer(initialState, setGenre('Comedy'));

    expect(result.genre).toBe(expectedGenre);
  });
});
