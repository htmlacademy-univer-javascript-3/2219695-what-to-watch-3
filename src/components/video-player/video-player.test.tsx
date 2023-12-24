import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import VideoPlayer from './video-player.tsx';
import {smallFilms} from '../../mocks/smallFilms.ts';

describe('VideoPlayer', () => {
  it('should render correctly', () => {
    render(<VideoPlayer previewImage={smallFilms[0].previewImage} previewVideoLink={smallFilms[0].previewVideoLink}/>);

    expect(screen.getByTestId('filmVideo')).toBeInTheDocument();
  });
});
