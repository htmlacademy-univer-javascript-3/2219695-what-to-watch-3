import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import FilmsList from '../../components/films-list/films-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';

export default function MyListPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>WTW. Мой список фильмов</title>
      </Helmet>
      <div className="user-page">
        <Header/>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmsList/>
        </section>

        <Footer/>
      </div>
    </>
  );
}
