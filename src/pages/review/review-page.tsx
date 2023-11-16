import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate} from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks';

export default function ReviewPage(): JSX.Element {
  const film = useAppSelector((state) => state.detailsFilm);
  return (
    <div>
      {film !== undefined ?
        <>
          <Helmet>
            <title>WTW. Оставить комментарий</title>
          </Helmet>
          <section className="film-card film-card--full" >
            <div className="film-card__header">
              <div className="film-card__bg">
                <img src={film.backgroundImage} alt={film.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header/>

              <div className="film-card__poster film-card__poster--small">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
              </div>
            </div>

            <div className="add-review">
              <ReviewForm filmId={film.id}/>
            </div>

          </section>
        </>
        : <Navigate to={'not-found'}/>}
    </div>
  );
}
