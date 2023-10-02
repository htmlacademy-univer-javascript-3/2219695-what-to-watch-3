import {FilmCardProps} from '../../components/film-card/film-card.props.ts';
import {SmallFilmCardProps} from '../../components/small-film-card/small-film-card.props.ts';

export type MainPageProps = {
  filmCardProps: FilmCardProps;
  smallFilmsCards: SmallFilmCardProps[];
}
