import {JSX} from 'react';
import {AppRoute} from '../app/const.ts';
import {Link} from 'react-router-dom';

export default function HeaderGuest(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src="img/bg-header.jpg" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <Link
            to={AppRoute.Login}
            className="user-block__link"
          >
            Sign in
          </Link>
        </div>
      </header>

    </section>
  );
}
