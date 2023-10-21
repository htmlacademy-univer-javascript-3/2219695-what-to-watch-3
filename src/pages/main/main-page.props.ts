import {PromoFilmCardProps} from '../../components/promo-film-card/promo-film-card.props.ts';
import {SmallFilm} from '../../components/small-film-card/small-film-card.type.ts';

export type MainPageProps = {
  promoFilmCardProps: PromoFilmCardProps;
  smallFilmsCards: SmallFilm[];
}
