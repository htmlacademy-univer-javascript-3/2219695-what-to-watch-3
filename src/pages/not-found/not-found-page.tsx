import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import {Helmet} from 'react-helmet-async';

export default function NotFoundPage(): React.JSX.Element {
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
            className="page-title user-page__title"
            style={{
              fontSize: '100px'
            }}
          >
            404
          </h1>
        </header>

        <div className="sign-in user-page__content">
          <div style={{
            display: 'block',
            textAlign: 'center',
            fontSize: '30px',
            lineHeight: '30px',
            textDecoration: 'none',
            color: '#D9CD8D',
            marginBottom: '200px'
          }}
          >
            Упссс... Похоже, что такого фильма ещё не сняли.
          </div>
          <Link
            style={{
              display: 'block',
              textAlign: 'center',
              fontSize: '40px',
              textDecoration: 'none',
              color: '#D9CD8D'
            }}
            to={AppRoute.Main}
          >
            Вернуться на главную
          </Link>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <div className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </div>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
