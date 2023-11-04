import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/genre.ts';

export const setGenre = createAction<Genre>('genre/setGenre');
export const getFilms = createAction('films/getFilms');
