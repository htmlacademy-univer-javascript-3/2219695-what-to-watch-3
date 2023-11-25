import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WtwProcess} from '../../types/state';
import {NameSpace} from '../../components/app/const.ts';
import {Genre} from '../../types/genre.ts';

const initialState: WtwProcess = {
  genre: 'All genres',
};

export const wtwProcess = createSlice({
  name: NameSpace.Wtw,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<Genre>) => {
      state.genre = action.payload;
    },
  },
});

export const {setGenre} = wtwProcess.actions;
