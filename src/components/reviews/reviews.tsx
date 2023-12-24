import {JSX} from 'react';
import Review from '../review/review.tsx';
import {ReviewData} from '../../types/reviewData.ts';

export type ReviewsProps = {
  reviews: ReviewData[];
}

export default function Reviews({reviews}: ReviewsProps): JSX.Element {
  const firstCol = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondCol = reviews.slice(Math.ceil(reviews.length / 2), reviews.length);

  return (
    <div className="film-card__reviews film-card__row" data-testid="reviews-container">
      <div className="film-card__reviews-col">
        {firstCol.map((review) =>
          (
            <Review
              key={review.id}
              date={review.date}
              user={review.user}
              comment={review.comment}
              rating={review.rating}
            />
          )
        )}
      </div>
      <div className="film-card__reviews-col">
        {secondCol.map((review) =>
          (
            <Review
              key={review.id}
              date={review.date}
              user={review.user}
              comment={review.comment}
              rating={review.rating}
            />
          )
        )}
      </div>
    </div>
  );
}
