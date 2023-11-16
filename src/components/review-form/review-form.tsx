import {ChangeEvent, JSX, useState} from 'react';
import {addReviewAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';

const RATING_VALUES: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export type ReviewFormProps = {
  filmId: string;
}

export default function ReviewForm({filmId}: ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const dispatch = useAppDispatch();

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = () => {
    if (rating !== '' && reviewText !== '') {
      dispatch(addReviewAction({
        filmId,
        comment: reviewText,
        rating: Number(rating)
      }));
    }
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
          placeholder="ReviewData text"
          onChange={handleTextAreaOnChange}
        >
        </textarea>
        <div className="add-review__submit">
          <button onClick={handleSubmit} className="add-review__btn" type="button">Post</button>
        </div>
      </div>
    </form>
  );
}
