import {JSX} from 'react';
import {Genre} from '../../types/genre.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import cn from 'classnames';
import {setGenre} from '../../store/action.ts';

export type GenresListProps = {
  genres: Genre[];
}

export default function GenresList({genres}: GenresListProps): JSX.Element {
  const activeGenre: Genre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  function handleLinkClick(newGenre: Genre) {
    dispatch(setGenre(newGenre));
  }

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) =>
        (
          <li key={genre} className={cn('catalog__genres-item', {'catalog__genres-item--active': activeGenre === genre})}>
            <Link
              to={'#'}
              className="catalog__genres-link"
              onClick={() => handleLinkClick(genre)}
            >
              {genre}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
