import React from 'react';
import {SmallFilmCardProps} from './small-film-card.props.ts';

export default function SmallFilmCard({imgSrc, name}: SmallFilmCardProps): React.JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imgSrc} alt={name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}
