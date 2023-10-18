import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import {ReviewPageProps} from './review-page.props.ts';
import {IFilmCard} from '../../components/film-card/film-card.interface.ts';
import ReviewForm from '../../components/review-form/review-form.tsx';

export default function ReviewPage({filmsCards}: ReviewPageProps): JSX.Element {
  const {id} = useParams();
  const film: IFilmCard | undefined = filmsCards.find((filmCard: IFilmCard) => filmCard.id === id);

  return (
    <>
      <Helmet>
        <title>WTW. Оставить комментарий</title>
      </Helmet>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film?.posterImage} alt={`${film?.name} poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <ReviewForm/>
        </div>

      </section>
    </>
  );
}
