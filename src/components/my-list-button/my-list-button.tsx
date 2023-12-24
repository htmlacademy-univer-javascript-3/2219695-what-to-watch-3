import { useAppSelector, useAppDispatch } from '../../hooks';
import {getAuthStatus} from '../../store/user-process/user-process.selectors';
import {getDetailsFilm, getFavourites, getPromoFilm} from '../../store/wtw-data/wtw-data.selectors';
import { useNavigate } from 'react-router-dom';
import { Film } from '../../types/film';
import {JSX, useState} from 'react';
import {fetchChangeFavouriteStatusAction} from '../../store/api-actions.ts';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {PromoFilm} from '../../types/promo-film.ts';

export type MyListButtonProps = {
  isPromo?: boolean;
}

export default function MyListButton({isPromo = false}: MyListButtonProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const favorites = useAppSelector(getFavourites);
  const film = useAppSelector(getDetailsFilm) as Film;
  const promoFilm = useAppSelector(getPromoFilm) as PromoFilm;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavorite, setFavorite] = useState(isPromo ? promoFilm.isFavorite : film.isFavorite);

  const handleInListClick = () => {
    dispatch(fetchChangeFavouriteStatusAction({filmId: isPromo ? promoFilm.id : film.id, status: 0}));
    setFavorite(!isFavorite);
  };

  const handleAddListClick = () => {
    if (authStatus !== AuthStatus.Auth) {
      navigate(`${AppRoute.Login}`);
    } else {
      dispatch(fetchChangeFavouriteStatusAction({filmId: isPromo ? promoFilm.id : film.id, status: 1}));
      setFavorite(!isFavorite);
    }
  };

  return (
    <div>
      {isFavorite && authStatus === AuthStatus.Auth ?
        <button className="btn btn--list film-card__button" type="button" onClick={handleInListClick}>
          <svg viewBox="0 0 18 14" width={18} height={14}>
            <use xlinkHref="#in-list" />
          </svg>
          <span>My list</span>
          <span className="film-card__count">{favorites.length}</span>
        </button> :
        <button className="btn btn--list film-card__button" type="button" onClick={handleAddListClick}>
          <svg viewBox="0 0 19 20" width={19} height={20}>
            <use xlinkHref="#add" />
          </svg>
          <span>My list</span>
          <span className="film-card__count">{favorites.length}</span>
        </button>}
    </div>
  );
}
