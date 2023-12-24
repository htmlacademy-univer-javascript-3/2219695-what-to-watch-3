import {JSX} from 'react';
import {Genre} from '../../types/genre.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import cn from 'classnames';
import {getGenre} from '../../store/wtw-process/wtw-process.selectors.ts';
import {setGenre} from '../../store/wtw-process/wtw-process.slice.ts';

export type GenresListProps = {
  genres: Genre[];
}

export default function GenresList({genres}: GenresListProps): JSX.Element {
  const activeGenre: Genre = useAppSelector(getGenre);
  const dispatch = useAppDispatch();

  function handleLinkClick(newGenre: Genre) {
    dispatch(setGenre(newGenre));
  }

  return (
    <ul className="catalog__genres-list" data-testid="genreCatalog">
      {genres.map((genre) =>
        (
          <li
            key={genre}
            className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}
            data-testid="genreItem"
          >
            <Link
              to={'#'}
              className="catalog__genres-link"
              onClick={() => handleLinkClick(genre)}
              data-testid="genreItemLink"
            >
              {genre}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
