import {State} from '../../types/state.ts';
import {NameSpace} from '../../components/app/const.ts';
import {Genre} from '../../types/genre.ts';

export const getGenre = (state: State): Genre => state[NameSpace.Wtw].genre;
