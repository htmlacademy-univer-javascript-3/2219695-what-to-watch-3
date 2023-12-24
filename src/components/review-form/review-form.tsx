import {ChangeEvent, FormEvent, JSX, useState} from 'react';
import {addReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';

const RATING_VALUES: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

export type ReviewFormProps = {
  filmId: string;
}

export default function ReviewForm({filmId}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewTextValid, setReviewTextValid] = useState(false);
  const dispatch = useAppDispatch();

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setRating(e.target.value);
  }

  function handleTextAreaOnChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= MIN_REVIEW_LENGTH && e.target.value.length < MAX_REVIEW_LENGTH) {
      setReviewTextValid(true);
    } else {
      setReviewTextValid(false);
    }
    setReviewText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating !== '' && reviewTextValid) {
      dispatch(addReviewAction({
        filmId,
        comment: reviewText,
        rating: Number(rating)
      }));
    }
  }

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit} data-testid="reviewForm">
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
          placeholder="ReviewData text"
          onChange={handleTextAreaOnChange}
          data-testid="commentField"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={!reviewTextValid}>Post</button>
        </div>
      </div>
    </form>
  );
}
