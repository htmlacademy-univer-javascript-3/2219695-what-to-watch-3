import {render, screen} from '@testing-library/react';
import {film} from '../../mocks/film.ts';
import Details from './details.tsx';
import {getRunTimePlayer} from '../../utils/getRunTime.ts';

describe('Details', () => {
  it('should render correctly', () => {
    render(
      <Details
        director={film.director}
        starring={film.starring}
        runTime={film.runTime}
        genre={film.genre}
        released={film.released}
      />
    );

    expect(screen.getByText(film.director)).toBeInTheDocument();
    expect(screen.getAllByTestId('star').length).toBe(film.starring.length);
    expect(screen.getByText(getRunTimePlayer(film.runTime))).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });
});
