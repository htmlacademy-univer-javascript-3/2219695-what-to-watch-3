import {FilmCardProps} from '../../components/film-card/film-card.props.ts';
import {ISmallFilmCard} from '../../components/small-film-card/small-film-card.interface.ts';

export type MainPageProps = {
  filmCardProps: FilmCardProps;
  smallFilmsCards: ISmallFilmCard[];
}
