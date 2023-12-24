import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../app/const.ts';

export default function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="logo" data-testid="logo">
        <Link to={AppRoute.Main} className="logo__link logo__link--light" data-testid="logoLink">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

