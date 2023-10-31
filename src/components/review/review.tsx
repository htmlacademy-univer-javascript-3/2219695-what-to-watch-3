import {JSX} from 'react';

function getDateTime(date: string): string {
  return date.split('T')[0];
}

function getDate(date: string): string {
  const newDate = new Date(Date.parse(date));
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('en', { month: 'long' });
  const day = newDate.getDate() - 1;

  return `${month} ${day}, ${year}`;
}

export type ReviewProps = {
  date: string;
  user: string;
  comment: string;
  rating: number;
  backgroundColor: string;
}

export default function Review({date, user, comment, rating, backgroundColor}: ReviewProps): JSX.Element {
  return (
    <div className="review" style={{borderBottom: backgroundColor}}>
      <blockquote className="review__quote">
        <p className="review__text">
          {comment}
        </p>
        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={getDateTime(date)}>
            {/*December 24, 2016*/}
            {getDate(date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}
