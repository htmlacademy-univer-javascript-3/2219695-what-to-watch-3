import {JSX, useRef, useState} from 'react';
import {SmallFilm} from '../../types/small-film.ts';
import SmallFilmCard from '../small-film-card/small-film-card.tsx';

export type FavouritesListProps = {
  favourites: SmallFilm[];
}

export default function FavouritesList({favourites}: FavouritesListProps): JSX.Element {
  const [idActiveCard, setIdActiveCard] = useState<string>('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleArticleMouseOver(id: string) {
    timeoutRef.current = setTimeout(() => {
      setIdActiveCard(id);
    }, 1000);
  }

  function handleArticleMouseLeave() {
    setIdActiveCard('');
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
  }

  return (
    <div className="catalog__films-list" data-testid="favouritesContainer">
      {favourites
        .map((film: SmallFilm) =>
          (
            <article
              className="small-film-card catalog__films-card"
              key={film.id}
              onMouseOver={() => handleArticleMouseOver(film.id)}
              onMouseLeave={handleArticleMouseLeave}
              data-testid="filmCard"
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
  );
}
