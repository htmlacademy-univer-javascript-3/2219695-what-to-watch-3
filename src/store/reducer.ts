import {createReducer} from '@reduxjs/toolkit';
import {getFilms, setGenre} from './action.ts';
import {smallFilmsCards} from '../mocks/small-films.ts';
import {SmallFilm} from '../types/small-film.ts';
import {Genre} from '../types/genre.ts';

const initialState: {genre: Genre; films: SmallFilm[]} = {
  genre: 'All genres',
  films: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = smallFilmsCards;
    });
});

export {reducer};
