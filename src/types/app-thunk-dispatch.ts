import {ThunkDispatch} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createAPI} from '../services/api.ts';
import {State} from './state.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
