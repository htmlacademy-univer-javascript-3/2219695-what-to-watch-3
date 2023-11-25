import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../components/app/const.ts';
import {wtwData} from './wtw-data/wtw-data.slice.ts';
import {wtwProcess} from './wtw-process/wtw-process.slice.ts';
import {userProcess} from './user-process/user-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Data]: wtwData.reducer,
  [NameSpace.Wtw]: wtwProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
