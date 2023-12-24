import {render, screen} from '@testing-library/react';
import Overview from './overview.tsx';
import {film} from '../../mocks/film.ts';

describe('Overview', () => {
  it('should render correctly', () => {
    render(
      <Overview
        rating={film.rating}
        scoresCount={film.scoresCount}
        description={film.description}
        director={film.director}
        starring={film.starring}
      />
    );

    expect(screen.getByText(film.rating)).toBeInTheDocument();
    expect(screen.getByText(`${film.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(film.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${film.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${film.starring.join(', ')}`)).toBeInTheDocument();
  });
});
