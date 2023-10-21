import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import Footer from '../../components/footer/footer.tsx';
import {FilmPageProps} from './film-page.props.ts';
import {Film} from '../../components/film-card/film-card.type.ts';

function getRating(rating: number): string {
  if (rating > 8) {
    return 'Very good';
  } else if (rating > 5) {
    return 'Good';
  } else {
    return 'Bad';
  }
}

export default function FilmPage({filmsCards}: FilmPageProps): JSX.Element {
  const {id} = useParams();
  const film: Film | undefined = filmsCards.find((filmCard: Film) => filmCard.id === id);
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

                <div className="film-card__desc">
                  <nav className="film-nav film-card__nav">
                    <ul className="film-nav__list">
                      <li className="film-nav__item film-nav__item--active">
                        <a href="#" className="film-nav__link">Overview</a>
                      </li>
                      <li className="film-nav__item">
                        <a href="#" className="film-nav__link">Details</a>
                      </li>
                      <li className="film-nav__item">
                        <a href="#" className="film-nav__link">Reviews</a>
                      </li>
                    </ul>
                  </nav>

                  <div className="film-rating">
                    <div className="film-rating__score">{film.rating}</div>
                    <p className="film-rating__meta">
                      <span className="film-rating__level">
                        {getRating(film.rating)}
                      </span>
                      <span className="film-rating__count">{film.scoresCount} ratings</span>
                    </p>
                  </div>

                  <div className="film-card__text">
                    <p>{film?.description}</p>

                    <p className="film-card__director"><strong>Director: {film.director}</strong></p>

                    <p className="film-card__starring">
                      <strong>
                        Starring: {film.starring.join(', ')}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <div className="catalog__films-list">
                <article className="small-film-card catalog__films-card">
                  <div className="small-film-card__image">
                    <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                      alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"
                    />
                  </div>
                  <h3 className="small-film-card__title">
                    <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of
                      Grindelwald
                    </a>
                  </h3>
                </article>

                <article className="small-film-card catalog__films-card">
                  <div className="small-film-card__image">
                    <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
                  </div>
                  <h3 className="small-film-card__title">
                    <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
                  </h3>
                </article>

                <article className="small-film-card catalog__films-card">
                  <div className="small-film-card__image">
                    <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175"/>
                  </div>
                  <h3 className="small-film-card__title">
                    <a className="small-film-card__link" href="film-page.html">Macbeth</a>
                  </h3>
                </article>

                <article className="small-film-card catalog__films-card">
                  <div className="small-film-card__image">
                    <img src="img/aviator.jpg" alt="Aviator" width="280" height="175"/>
                  </div>
                  <h3 className="small-film-card__title">
                    <a className="small-film-card__link" href="film-page.html">Aviator</a>
                  </h3>
                </article>
              </div>
            </section>

            <Footer/>
          </div>
        </> : <Navigate to={'not-found'}/>}
    </div>
  );
}
