import {JSX, useRef, useState} from 'react';
import {SmallFilm} from '../../types/small-film.ts';
import SmallFilmCard from '../small-film-card/small-film-card.tsx';
import ShowMoreButton from '../show-more-button/show-more-button.tsx';
import {useAppSelector} from '../../hooks';

const MAX_SHOW_FILMS = 8;

export type FilmsListProps = {
  genre?: string;
  filmId?: string;
}

export default function FilmsList({genre = 'All genres', filmId}: FilmsListProps): JSX.Element {
  const [idActiveCard, setIdActiveCard] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [end, setEnd] = useState(MAX_SHOW_FILMS);
  const films = useAppSelector((state) => state.films);
  const filmsByGenre = genre === 'All genres' ? films : films.filter((film: SmallFilm) => (film.genre === genre && film.id !== filmId));

  function handleArticleMouseOver(id: string) {
    timeoutRef.current = setTimeout(() => {
      setIdActiveCard(id);
    }, 1000);
  }

  function handleArticleMouseLeave() {
    setIdActiveCard('');
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }

  function handleShowMoreClick() {
    setEnd((prev) => prev + MAX_SHOW_FILMS);
  }

  return (
    <>
      <div className="catalog__films-list">
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
    </>
  );
}