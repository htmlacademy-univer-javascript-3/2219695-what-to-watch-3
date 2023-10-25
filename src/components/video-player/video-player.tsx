import {JSX} from 'react';
import {VideoPlayerProps} from './video-player.props.ts';

export default function VideoPlayer({previewVideoLink, previewImage}: VideoPlayerProps): JSX.Element {
  return (
    <video
      src={previewVideoLink}
      poster={previewImage}
      width="100%"
      height="100%"
      muted
      loop
      autoPlay
    >
    </video>
  );
}
