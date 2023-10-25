import {JSX, useRef, useState} from 'react';
import {FilmsListProps} from './films-list.props.ts';
import {SmallFilm} from '../small-film-card/small-film-card.type.ts';
import SmallFilmCard from '../small-film-card/small-film-card.tsx';

export default function FilmsList({smallFilmCards}: FilmsListProps): JSX.Element {
  const [idActiveCard, setIdActiveCard] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleArticleMouseOver(id: string) {
    timeoutRef.current = setTimeout(() => {
      setIdActiveCard(id);
    }, 1000);
  }

  function handleArticleMouseLeave() {
    setIdActiveCard('');
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }

  return (
    <div className="catalog__films-list">
      {smallFilmCards.map((smallFilmCard: SmallFilm) =>
        (
          <article
            className="small-film-card catalog__films-card"
            key={smallFilmCard.id}
            onMouseOver={() => handleArticleMouseOver(smallFilmCard.id)}
            onMouseLeave={handleArticleMouseLeave}
          >
            <SmallFilmCard
              id={smallFilmCard.id}
              previewImage={smallFilmCard.previewImage}
              name={smallFilmCard.name}
              previewVideoLink={smallFilmCard.previewVideoLink}
              isActiveCard={idActiveCard}
            />
          </article>
        )
      )}
    </div>
  );
}
