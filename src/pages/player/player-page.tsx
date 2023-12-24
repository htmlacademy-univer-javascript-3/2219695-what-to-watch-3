import {JSX, useRef, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getDetailsFilm, getPromoFilm} from '../../store/wtw-data/wtw-data.selectors.ts';
import {getRunTimePlayer} from '../../utils/getRunTimePlayer.ts';
import {getTimeLeft} from '../../utils/getTimeLeft.ts';

export default function PlayerPage(): JSX.Element {
  const film = useAppSelector(getDetailsFilm);
  const promoFilm = useAppSelector(getPromoFilm);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const togglerRef = useRef<HTMLDivElement>(null);
  const timeLeftRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const location = useLocation();

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
      videoRef.current.requestFullscreen();
    }
  }

  function handleTimeUpdate() {
    if (
      progressRef.current &&
      videoRef.current &&
      film &&
      togglerRef.current &&
      timeLeftRef.current
    ) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.value = progress;
      togglerRef.current.style.left = `${progress}%`;
      timeLeftRef.current.innerHTML = getTimeLeft(videoRef.current.duration - videoRef.current.currentTime);
    }
  }

  return (
    <div>
      {
        location.pathname.split('/')[2] === promoFilm?.id ?
          <div>
            {promoFilm !== undefined && film !== undefined ?
              <>
                <Helmet>
                  <title>WTW. Просмотр фильма</title>
                </Helmet>
                <div className="player" data-testid="playerContainer">
                  <video ref={videoRef} src={promoFilm.videoLink} className="player__video" poster={promoFilm.posterImage}
                    onTimeUpdate={handleTimeUpdate}
                  >
                  </video>

                  <button
                    type="button"
                    className="player__exit"
                    onClick={() => navigate(`/films/${promoFilm.id}`)}
                  >
                    Exit
                  </button>

                  <div className="player__controls">
                    <div className="player__controls-row">
                      <div className="player__time">
                        <progress className="player__progress" value="0" max="100" ref={progressRef}></progress>
                        <div className="player__toggler" ref={togglerRef}>Toggler</div>
                      </div>
                      <div className="player__time-value" ref={timeLeftRef}>{getRunTimePlayer(film.runTime)}</div>
                    </div>

                    <div className="player__controls-row">
                      {isPlay ?
                        <button
                          onClick={handleVideoPause}
                          type="button"
                          className="player__play"
                          data-testid="pauseButton"
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
                          data-testid="playButton"
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
                        data-testid="fullScreenButton"
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
          </div> :
          <div>
            {film !== undefined ?
              <>
                <Helmet>
                  <title>WTW. Просмотр фильма</title>
                </Helmet>
                <div className="player" data-testid="playerContainer">
                  <video ref={videoRef} src={film.videoLink} className="player__video" poster={film.posterImage}
                    onTimeUpdate={handleTimeUpdate}
                  >
                  </video>

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
                        <progress className="player__progress" value="0" max="100" ref={progressRef}></progress>
                        <div className="player__toggler" ref={togglerRef}>Toggler</div>
                      </div>
                      <div className="player__time-value" ref={timeLeftRef}>{getRunTimePlayer(film.runTime)}</div>
                    </div>

                    <div className="player__controls-row">
                      {isPlay ?
                        <button
                          onClick={handleVideoPause}
                          type="button"
                          className="player__play"
                          data-testid="pauseButton"
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
                          data-testid="playButton"
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
                        data-testid="fullScreenButton"
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
      }
    </div>
  );
}
