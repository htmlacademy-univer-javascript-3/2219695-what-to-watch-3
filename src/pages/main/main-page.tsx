import {JSX} from 'react';
import PromoFilmCard from '../../components/promo-film-card/promo-film-card.tsx';
import {Helmet} from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list.tsx';
import GenresList from '../../components/genres-list/genres-list.tsx';
import {useAppSelector} from '../../hooks';
import {Genre} from '../../types/genre.ts';
import Footer from '../../components/footer/footer.tsx';
import {getGenre} from '../../store/wtw-process/wtw-process.selectors.ts';
import {getGenres, getPromoFilm} from '../../store/wtw-data/wtw-data.selectors.ts';
import HeaderGuest from '../../components/header-guest/header-guest.tsx';

export default function MainPage(): JSX.Element {
  const genres: Genre[] = useAppSelector(getGenres);
  const activeGenre: Genre = useAppSelector(getGenre);
  const promoFilm = useAppSelector(getPromoFilm);

  return (
    <>
      <Helmet>
        <title>WTW. Главная страница</title>
      </Helmet>

      {
        promoFilm ?
          <PromoFilmCard
            id={promoFilm.id}
            name={promoFilm.name}
            genre={promoFilm.genre}
            released={promoFilm.released}
            backgroundImage={promoFilm.backgroundImage}
            posterImage={promoFilm.posterImage}
          />
          : <HeaderGuest/>
      }


      <div className="page-content">
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
