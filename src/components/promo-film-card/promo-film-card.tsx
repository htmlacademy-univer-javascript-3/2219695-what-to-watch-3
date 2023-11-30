import {JSX, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../header/header.tsx';
import {SmallFilm} from '../../types/small-film.ts';
import {fetchChangeFavouriteStatusAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';

export type PromoFilmCardProps = {
  id: string;
  name: string;
  genre: string;
  released: number;
  backgroundImage: string;
  posterImage: string;
  favourites: SmallFilm[];
}

export default function PromoFilmCard({id, name, genre, released, backgroundImage, posterImage, favourites}: PromoFilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [favouriteStatus, setFavouriteStatus] = useState<0 | 1>(0);

  function handleClickMyList() {
    const newStatus = favouriteStatus === 0 ? 1 : 0;
    setFavouriteStatus(newStatus);
    dispatch(fetchChangeFavouriteStatusAction({filmId: id, status: favouriteStatus}));
    if (favouriteStatus === 0) {
      navigate('/my-list');
    }
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header/>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <button
                className="btn btn--play film-card__button"
                type="button"
                onClick={() => navigate(`/player/${id}`)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                className="btn btn--list film-card__button"
                type="button"
                onClick={handleClickMyList}
              >
                {favouriteStatus === 1 ?
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  :
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>}
                <span>My list</span>
                <span className="film-card__count">{favourites.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
