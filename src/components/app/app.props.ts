import {MainPageProps} from '../../pages/main/main-page.props.ts';
import {FilmPageProps} from '../../pages/film/film-page.props.ts';
import {PlayerPageProps} from '../../pages/player/player-page.props.ts';
import {ReviewPageProps} from '../../pages/review/review-page.props.ts';

export type AppProps = {
  mainPageProps: MainPageProps;
  filmPageProps: FilmPageProps;
  playerPageProps: PlayerPageProps;
  reviewPageProps: ReviewPageProps;
}
