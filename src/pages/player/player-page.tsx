import {JSX, useRef, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getDetailsFilm} from '../../store/wtw-data/wtw-data.selectors.ts';

function getRunTimePlayer(runTime: number): string {
  const hours = Math.trunc(runTime / 60);
  const minutes = runTime % 60;
  return `${hours}:${minutes}`;
}

export default function PlayerPage(): JSX.Element {
  const film = useAppSelector(getDetailsFilm);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = useState<boolean>(false);

  function handleVideoPlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlay(true);
    }
  }

  function handleVideoPause() {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlay(false);
    }
  }

  function handleFullScreen() {
    if (videoRef.current) {
      videoRef.current.requestFullscreen().then();
    }
  }

  return (
    <div>
      {film !== undefined ?
        <>
          <Helmet>
            <title>WTW. Просмотр фильма</title>
          </Helmet>
          <div className="player">
            <video ref={videoRef} src={film.videoLink} className="player__video" poster={film.posterImage}></video>

            <button
              type="button"
              className="player__exit"
              onClick={() => navigate(`/films/${film.id}`)}
            >
              Exit
            </button>

            <div className="player__controls">
              <div className="player__controls-row">
                <div className="player__time">
                  <progress className="player__progress" value="30" max="100"></progress>
                  <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
                </div>
                {/*<div className="player__time-value">1:30:29</div>*/}
                <div className="player__time-value">{getRunTimePlayer(film.runTime)}</div>
              </div>

              <div className="player__controls-row">
                {isPlay ?
                  <button
                    onClick={handleVideoPause}
                    type="button"
                    className="player__play"
                  >
                    <svg viewBox="0 0 14 21" width="14" height="21">
                      <use xlinkHref="#pause"></use>
                    </svg>
                    <span>Pause</span>
                  </button>
                  :
                  <button
                    onClick={handleVideoPlay}
                    type="button"
                    className="player__play"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>}
                <div className="player__name">Transpotting</div>

                <button
                  onClick={handleFullScreen}
                  type="button"
                  className="player__full-screen"
                >
                  <svg viewBox="0 0 27 27" width="27" height="27">
                    <use xlinkHref="#full-screen"></use>
                  </svg>
                  <span>Full screen</span>
                </button>
              </div>
            </div>
          </div>
        </>
        : <Navigate to={'not-found'}/>}
    </div>
  );
}
