import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory} from '../../mocks/mock-component.tsx';
import Tabs from './tabs.tsx';
import {film} from '../../mocks/film.ts';
import {mockReviews} from '../../mocks/mockReviews.ts';

describe('Tabs', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(
      <Tabs
        rating={film.rating}
        description={film.description}
        director={film.director}
        scoresCount={film.scoresCount}
        starring={film.starring}
        runTime={film.runTime}
        genre={film.genre}
        released={film.released}
        reviews={mockReviews}
      />
    );

    render(preparedComponent);

    expect(screen.getByTestId('tabContainer')).toBeInTheDocument();
    expect(screen.getByTestId('tabNavContainer')).toBeInTheDocument();
  });
});
