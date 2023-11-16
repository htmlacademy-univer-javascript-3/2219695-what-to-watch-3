import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {MainPageProps} from './pages/main/main-page.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchFilmsAction} from './store/api-actions.ts';

const mainPageProps: MainPageProps = {
  promoFilmCardProps: {
    id: '123',
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    date: '2014'
  },
};

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<ToastContainer/>  TODO:Разобраться почему получаю ошибку*/}
      <App
        mainPageProps={mainPageProps}
      />
    </Provider>
  </React.StrictMode>
);
