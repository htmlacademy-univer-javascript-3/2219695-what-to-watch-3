import {JSX, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import Footer from '../../components/footer/footer.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import FilmsList from '../../components/films-list/films-list.tsx';
import Header from '../../components/header/header.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchDetailsFilmAction, fetchReviewsAction} from '../../store/api-actions.ts';
import {AuthStatus} from '../../components/app/const.ts';

export default function FilmPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.detailsFilm);
  const filmReviews = useAppSelector((state) => state.reviews);
  const isLogin = useAppSelector((state) => state.authStatus === AuthStatus.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsFilmAction({filmId: id}));
      dispatch(fetchReviewsAction({filmId: id}));
    }
  }, [dispatch, id]);

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

              <Header/>

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
                    {isLogin && <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>}
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
              <FilmsList genre={film.genre} filmId={film.id}/>
            </section>

            <Footer/>
          </div>
        </> : <Navigate to={'not-found'}/>}
    </div>
  );
}
