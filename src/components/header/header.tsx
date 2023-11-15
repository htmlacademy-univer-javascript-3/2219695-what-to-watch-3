import {JSX} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.authStatus === AuthStatus.Auth);

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
                onClick={(evt) => {
                  evt.preventDefault();
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

      {/*<ul className="user-block">*/}
      {/*  <li className="user-block__item">*/}
      {/*    <div className="user-block__avatar">*/}
      {/*      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>*/}
      {/*    </div>*/}
      {/*  </li>*/}
      {/*  <li className="user-block__item">*/}
      {/*    <Link*/}
      {/*      to={AppRoute.Main}*/}
      {/*      onClick={(evt) => {*/}
      {/*        evt.preventDefault();*/}
      {/*        dispatch(logoutAction());*/}
      {/*      }}*/}
      {/*      className="user-block__link"*/}
      {/*    >*/}
      {/*      Sign out*/}
      {/*    </Link>*/}
      {/*  </li>*/}
      {/*</ul>*/}
    </header>
  );
}
