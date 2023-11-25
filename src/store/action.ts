import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../components/app/const.ts';

export const redirectToRoute = createAction<AppRoute | string>('wtw/redirectToRoute');
