import {FormEvent, JSX, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../components/app/const.ts';
import Footer from '../../components/footer/footer.tsx';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions.ts';
import classNames from 'classnames';
import {isPasswordValid} from '../../utils/isPasswordValid.ts';
import {isLoginValid} from '../../utils/isLoginValid.ts';

export default function LoginPage(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginInvalid, setLoginInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoginValid(login) && isPasswordValid(password)) {
      dispatch(loginAction({
        login,
        password
      }));
      navigate(AppRoute.Main);
    } else {
      if (!isLoginValid(login)) {
        setLoginInvalid(true);
      } else {
        setLoginInvalid(false);
      }

      if (!isPasswordValid(password)) {
        setPasswordInvalid(true);
      } else {
        setPasswordInvalid(false);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>WTW. Вход</title>
      </Helmet>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            onSubmit={handleSubmit}
          >
            {
              loginInvalid &&
              <div className="sign-in__message">
                <p>Please enter a valid email address. <br/>Example - yourName@mail.ru</p>
              </div>
            }
            {
              passwordInvalid &&
              <div className="sign-in__message">
                <p>Please enter a valid password. <br/>It must contain at least one digit and one letter</p>
              </div>
            }
            <div className="sign-in__fields">
              <div className={classNames('sign-in__field', {'sign-in__field--error': loginInvalid})}>
                <input
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  required
                  data-testid="loginElement"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={classNames('sign-in__field', {'sign-in__field--error': passwordInvalid})}>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  required
                  data-testid="passwordElement"
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button
                className="sign-in__btn"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    </>
  );
}
