import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import Footer from '../../components/footer/footer.tsx';

import {Film} from '../../types/film.ts';
import Tabs from '../../components/tabs/tabs.tsx';
import {ReviewData} from '../../types/reviewData.ts';
import {reviews} from '../../mocks/reviews.ts';
import FilmsList from '../../components/films-list/films-list.tsx';
import {SmallFilm} from '../../types/small-film.ts';

export type FilmPageProps = {
  filmsCards: Film[];
  smallFilmsCards: SmallFilm[];
}

export default function FilmPage({filmsCards, smallFilmsCards}: FilmPageProps): JSX.Element {
  const {id} = useParams();
  const film: Film | undefined = filmsCards.find((filmCard: Film) => filmCard.id === id);
  const filmReviews: ReviewData[] = reviews;
  const navigate = useNavigate();

  return (
    <div>
      {film !== undefined ?
        <>
          <Helmet>
            <title>WTW. Выбранный фильм</title>
          </Helmet>
          <section className="film-card film-card--full" style={{backgroundColor: `${film.backgroundColor}`}}>
            <div className="film-card__hero">
              <div className="film-card__bg">
                <img src={film.backgroundImage} alt={film.name}/>
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <header className="page-header film-card__head">
                <div className="logo">
                  <Link to={AppRoute.Main} className="logo__link">
                    <span className="logo__letter logo__letter--1">W</span>
                    <span className="logo__letter logo__letter--2">T</span>
                    <span className="logo__letter logo__letter--3">W</span>
                  </Link>
                </div>

                <ul className="user-block">
                  <li className="user-block__item">
                    <div className="user-block__avatar">
                      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                    </div>
                  </li>
                  <li className="user-block__item">
                    <a className="user-block__link">Sign out</a>
                  </li>
                </ul>
              </header>

              <div className="film-card__wrap">
                <div className="film-card__desc">
                  <h2 className="film-card__title">{film.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{film.genre}</span>
                    <span className="film-card__year">{film.released}</span>
                  </p>

                  <div className="film-card__buttons">
                    <button
                      className="btn btn--play film-card__button"
                      type="button"
                      onClick={() => navigate(`/player/${film.id}`)}
                    >
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button
                      className="btn btn--list film-card__button"
                      type="button"
                      onClick={() => navigate('/my-list')}
                    >
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                      <span className="film-card__count">9</span>
                    </button>
                    <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img src={film.posterImage} alt={`${film.name} poster`} width="218"
                    height="327"
                  />
                </div>
                <Tabs
                  rating={film.rating}
                  description={film.description}
                  scoresCount={film.scoresCount}
                  director={film.director}
                  starring={film.starring}
                  runTime={film.runTime}
                  genre={film.genre}
                  released={film.released}
                  reviews={filmReviews}
                />
              </div>
            </div>
          </section>
          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>
              <FilmsList smallFilmCards={smallFilmsCards} genre={film.genre} filmId={film.id}/>
            </section>

            <Footer/>
          </div>
        </> : <Navigate to={'not-found'}/>}
    </div>
  );
}
