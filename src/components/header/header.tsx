import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../app/const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';
import {getCheckedLogin} from '../../store/user-process/user-process.selectors.ts';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(getCheckedLogin);

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={AppRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <ul className="user-block">
        {isLogin ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <Link
                to={AppRoute.Main}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logoutAction());
                }}
                className="user-block__link"
              >
              Sign out
              </Link>
            </li>
          </> :
          <li className="user-block__item">
            <Link
              to={AppRoute.Login}
              className="user-block__link"
            >
              Sign in
            </Link>
          </li>}

      </ul>
    </header>
  );
}
