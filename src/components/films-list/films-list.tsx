import {JSX, useEffect, useRef, useState} from 'react';
import {SmallFilm} from '../../types/small-film.ts';
import SmallFilmCard from '../small-film-card/small-film-card.tsx';
import ShowMoreButton from '../show-more-button/show-more-button.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchSimilarFilmsAction} from '../../store/api-actions.ts';
import {getFilms, getSimilarFilms} from '../../store/wtw-data/wtw-data.selectors.ts';

const MAX_SHOW_FILMS = 8;
const MAX_SHOW_SIMILAR_FILMS = 4;

export type FilmsListProps = {
  genre?: string;
  filmId?: string;
}

export default function FilmsList({genre = 'All genres', filmId}: FilmsListProps): JSX.Element {
  const [idActiveCard, setIdActiveCard] = useState<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [end, setEnd] = useState(MAX_SHOW_FILMS);
  const [endSimilar, setEndSimilar] = useState(MAX_SHOW_SIMILAR_FILMS);
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const filmsByGenre = genre === 'All genres' ? films : films.filter((film) => (film.genre === genre));
  const similarFilms = useAppSelector(getSimilarFilms);

  useEffect(() => {
    if (filmId) {
      dispatch(fetchSimilarFilmsAction({filmId}));
    }
  }, [dispatch, filmId]);

  function handleArticleMouseOver(id: string) {
    timeoutRef.current = setTimeout(() => {
      setIdActiveCard(id);
    }, 1000);
  }

  function handleArticleMouseLeave() {
    setIdActiveCard('');
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
  }

  function handleShowMoreClick() {
    setEnd((prev) => prev + MAX_SHOW_FILMS);
  }

  function handleShowMoreSimilarClick() {
    setEndSimilar((prev) => prev + MAX_SHOW_SIMILAR_FILMS);
  }

  if (filmId !== undefined) {
    return (
      <>
        <div className="catalog__films-list" data-testid="similarFilmsContainer">
          {similarFilms
            .slice(0, endSimilar)
            .map((film: SmallFilm) =>
              (
                <article
                  className="small-film-card catalog__films-card"
                  key={film.id}
                  onMouseOver={() => handleArticleMouseOver(film.id)}
                  onMouseLeave={handleArticleMouseLeave}
                >
                  <SmallFilmCard
                    id={film.id}
                    previewImage={film.previewImage}
                    name={film.name}
                    previewVideoLink={film.previewVideoLink}
                    isActiveCard={idActiveCard}
                  />
                </article>
              )
            )}
        </div>
        {
          similarFilms.slice(0, endSimilar).length > endSimilar - 1 &&
          <div
            className="catalog__more"
            onClick={handleShowMoreSimilarClick}
          >
            <ShowMoreButton/>
          </div>
        }
      </>
    );
  }

  return (
    <div>
      {genre === 'All genres' ?
        <>
          <div className="catalog__films-list" data-testid="allGenresFilmsContainer">
            {films
              .slice(0, end)
              .map((film: SmallFilm) =>
                (
                  <article
                    className="small-film-card catalog__films-card"
                    key={film.id}
                    onMouseOver={() => handleArticleMouseOver(film.id)}
                    onMouseLeave={handleArticleMouseLeave}
                  >
                    <SmallFilmCard
                      id={film.id}
                      previewImage={film.previewImage}
                      name={film.name}
                      previewVideoLink={film.previewVideoLink}
                      isActiveCard={idActiveCard}
                    />
                  </article>
                )
              )}
          </div>
          {
            films.slice(0, end).length > end - 1 &&
              <div
                className="catalog__more"
                onClick={handleShowMoreClick}
              >
                <ShowMoreButton/>
              </div>
          }
        </> :
        <>
          <div className="catalog__films-list" data-testid="filmsByGenreContainer">
            {filmsByGenre
              .slice(0, end)
              .map((film: SmallFilm) =>
                (
                  <article
                    className="small-film-card catalog__films-card"
                    key={film.id}
                    onMouseOver={() => handleArticleMouseOver(film.id)}
                    onMouseLeave={handleArticleMouseLeave}
                  >
                    <SmallFilmCard
                      id={film.id}
                      previewImage={film.previewImage}
                      name={film.name}
                      previewVideoLink={film.previewVideoLink}
                      isActiveCard={idActiveCard}
                    />
                  </article>
                )
              )}
          </div>
          {
            filmsByGenre.slice(0, end).length > end - 1 &&
              <div
                className="catalog__more"
                onClick={handleShowMoreClick}
              >
                <ShowMoreButton/>
              </div>
          }
        </>}
    </div>
  );
}
