import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import {Helmet} from 'react-helmet-async';
import './not-found-page.css';
import Footer from '../../components/footer/footer.tsx';

export default function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>WTW. Not Found</title>
      </Helmet>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <div className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </div>
          </div>

          <h1
            className="page-title user-page__title not-found-title"
          >
            404
          </h1>
        </header>

        <div className="sign-in user-page__content">
          <div className="not-found-message">
            Упссс... Похоже, что такого фильма ещё не сняли.
          </div>
          <Link
            className="not-found-link"
            to={AppRoute.Main}
          >
            Вернуться на главную
          </Link>
        </div>

        <Footer/>
      </div>
    </>
  );
}
