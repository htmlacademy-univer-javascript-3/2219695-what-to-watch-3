import {PromoFilmCardProps} from '../../components/promo-film-card/promo-film-card.props.ts';
import {ISmallFilmCard} from '../../components/small-film-card/small-film-card.interface.ts';

export type MainPageProps = {
  promoFilmCardProps: PromoFilmCardProps;
  smallFilmsCards: ISmallFilmCard[];
}
