import {JSX} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player.tsx';
import {useAppDispatch} from '../../hooks';
import {fetchDetailsFilmAction, fetchReviewsAction} from '../../store/api-actions.ts';

export type SmallFilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isActiveCard: string;
}

export default function SmallFilmCard({id, previewImage, name, previewVideoLink, isActiveCard}: SmallFilmCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function loadDetailsFilmData() {
    dispatch(fetchDetailsFilmAction({filmId: id}));
    dispatch(fetchReviewsAction({filmId: id}));
  }

  function handleCardClick() {
    dispatch(fetchDetailsFilmAction({filmId: id}));
    dispatch(fetchReviewsAction({filmId: id}));
    navigate(`/films/${id}`);
  }

  return (
    <>
      <div className="small-film-card__image" onClick={handleCardClick} data-testid="filmCard">
        {isActiveCard === id
          ? <VideoPlayer previewVideoLink={previewVideoLink} previewImage={previewImage} data-testid="videoPlayer"/>
          : <img src={previewImage} alt={name} width="280" height="175" data-testid="posterImg"/>}
      </div>
      <h3 className="small-film-card__title">
        <Link onClick={loadDetailsFilmData} className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </>
  );
}
