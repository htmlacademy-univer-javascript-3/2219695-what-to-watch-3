import {JSX, useEffect} from 'react';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card.tsx';
import {Helmet} from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list.tsx';
import GenresList from '../../components/genres-list/genres-list.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Genre} from '../../types/genre.ts';
import Footer from '../../components/footer/footer.tsx';
import {getGenre} from '../../store/wtw-process/wtw-process.selectors.ts';
import {getGenres, getPromoFilm, getPromoFilmDataLoadingStatus} from '../../store/wtw-data/wtw-data.selectors.ts';
import LoadingPage from '../loading/loading-page.tsx';
import {fetchPromoFilmAction} from '../../store/api-actions.ts';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const genres: Genre[] = useAppSelector(getGenres);
  const activeGenre: Genre = useAppSelector(getGenre);
  const promoFilm = useAppSelector(getPromoFilm);
  const isPromoFilmDataLoading = useAppSelector(getPromoFilmDataLoadingStatus);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  if (isPromoFilmDataLoading) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <>
      <Helmet>
        <title>WTW. Главная страница</title>
      </Helmet>

      {promoFilm && <PromoFilmCard/>}

      <div className="page-content" data-testid="mainPageContainer">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <FilmsList genre={activeGenre}/>

        </section>

        <Footer/>
      </div>
    </>
  );
}
