import {JSX} from 'react';

function getDateTime(date: string): string {
  return date.split('T')[0];
}

function getDate(date: string): string {
  const newDate = new Date(Date.parse(date));
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('en', { month: 'long' });
  const day = newDate.getUTCDate();

  return `${month} ${day}, ${year}`;
}

export type ReviewProps = {
  date: string;
  user: string;
  comment: string;
  rating: number;
}

export default function Review({date, user, comment, rating}: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {comment}
        </p>
        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={getDateTime(date)}>
            {getDate(date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}
