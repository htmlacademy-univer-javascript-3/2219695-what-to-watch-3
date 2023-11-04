import {JSX} from 'react';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player.tsx';

export type SmallFilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isActiveCard: string;
}


export default function SmallFilmCard({id, previewImage, name, previewVideoLink, isActiveCard}: SmallFilmCardProps): JSX.Element {
  return (
    <>
      <div className="small-film-card__image">
        {isActiveCard === id
          ? <VideoPlayer previewVideoLink={previewVideoLink} previewImage={previewImage}/>
          : <img src={previewImage} alt={name} width="280" height="175"/>}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </>
  );
}