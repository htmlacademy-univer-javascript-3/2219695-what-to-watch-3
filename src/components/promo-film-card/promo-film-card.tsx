import {JSX} from 'react';
import Header from '../header/header.tsx';
import {fetchDetailsFilmAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getPromoFilm, getPromoFilmDataLoadingStatus} from '../../store/wtw-data/wtw-data.selectors.ts';
import LoadingPage from '../../pages/loading/loading-page.tsx';
import MyListButton from '../my-list-button/my-list-button.tsx';

export default function PromoFilmCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const isPromoFilmDataLoading = useAppSelector(getPromoFilmDataLoadingStatus);

  if (isPromoFilmDataLoading) {
    return (
      <LoadingPage/>
    );
  }

  function handleClickPlay() {
    if (promoFilm) {
      dispatch(fetchDetailsFilmAction({filmId: promoFilm.id, isPromo: true}));
    }
  }

  return (
    <div>
      {
        promoFilm &&
        <section className="film-card">
          <div className="film-card__bg">
            <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src={promoFilm.posterImage} alt={promoFilm.name} width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promoFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promoFilm.genre}</span>
                  <span className="film-card__year">{promoFilm.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button
                    className="btn btn--play film-card__button"
                    type="button"
                    onClick={handleClickPlay}
                    data-testid="playButton"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <MyListButton isPromo/>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </div>
  );
}
