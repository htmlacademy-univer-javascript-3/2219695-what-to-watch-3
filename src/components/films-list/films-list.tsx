import {JSX, useState} from 'react';
import {FilmsListProps} from './films-list.props.ts';
import {ISmallFilmCard} from '../small-film-card/small-film-card.interface.ts';
import SmallFilmCard from '../small-film-card/small-film-card.tsx';

export default function FilmsList({smallFilmCards}: FilmsListProps): JSX.Element {
  const [idActiveCard, setIdActiveCard] = useState<string>('');

  return (
    <div className="catalog__films-list">
      {smallFilmCards.map((smallFilmCard: ISmallFilmCard) =>
        (
          <article
            className="small-film-card catalog__films-card"
            key={smallFilmCard.id}
            onMouseOver={() => setIdActiveCard(smallFilmCard.id)}
          >
            <SmallFilmCard
              id={smallFilmCard.id}
              previewImage={smallFilmCard.previewImage}
              name={smallFilmCard.name}
            />
          </article>
        )
      )}
    </div>
  );
}
