import {ChangeEvent, JSX, useState} from 'react';

const RATING_VALUES: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export default function ReviewForm(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rating, setRating] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [reviewText, setReviewText] = useState('');

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {RATING_VALUES.map((ratingValue) => (
            <>
              <input
                className="rating__input"
                id={`star-${ratingValue}`}
                type="radio"
                name="rating"
                value={ratingValue}
                onChange={handleInputOnChange}
              />
              <label className="rating__label" htmlFor={`star-${ratingValue}`}>Rating {ratingValue}</label>
            </>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text" id="review-text"
          placeholder="Review text"
          onChange={handleTextAreaOnChange}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}
