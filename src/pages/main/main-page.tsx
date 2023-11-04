import {JSX, useEffect} from 'react';
import PromoFilmCard, {PromoFilmCardProps} from '../../components/promo-film-card/promo-film-card.tsx';
import {Helmet} from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list.tsx';
import GenresList from '../../components/genres-list/genres-list.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Genre} from '../../types/genre.ts';
import {getFilms} from '../../store/action.ts';

export type MainPageProps = {
  promoFilmCardProps: PromoFilmCardProps;
}

export default function MainPage({promoFilmCardProps}: MainPageProps): JSX.Element {
  const genres: Genre[] = useAppSelector((state) => ['All genres', ...new Set(state.films.map((film) => film.genre))] as Genre[]);
  const activeGenre: Genre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>WTW. Главная страница</title>
      </Helmet>
      <PromoFilmCard
        id={promoFilmCardProps.id}
        name={promoFilmCardProps.name}
        genre={promoFilmCardProps.genre}
        date={promoFilmCardProps.date}
      />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <FilmsList genre={activeGenre}/>

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
