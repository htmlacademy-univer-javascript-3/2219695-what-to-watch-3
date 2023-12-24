import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import FavouritesList from '../../components/favourites-list/favourites-list.tsx';
import {SmallFilm} from '../../types/small-film.ts';

export type MyListPageProps = {
  favourites: SmallFilm[];
}

export default function MyListPage({favourites}: MyListPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>WTW. Мой список фильмов</title>
      </Helmet>
      <div className="user-page" data-testid="myListPageContainer">
        <Header/>

        <section className="catalog" data-testid="userCatalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FavouritesList favourites={favourites}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}
