import {JSX} from 'react';

function getRating(rating: number): string {
  if (rating > 8) {
    return 'Very good';
  } else if (rating > 5) {
    return 'Good';
  } else {
    return 'Bad';
  }
}

export type OverviewProps = {
  rating: number;
  scoresCount: number;
  description: string;
  director: string;
  starring: string[];
}

export default function Overview({rating, scoresCount, description, director, starring}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {getRating(rating)}
          </span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>
            Starring: {starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}
