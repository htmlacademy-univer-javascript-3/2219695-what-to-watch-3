import {JSX} from 'react';

export type VideoPlayerProps = {
  previewVideoLink: string;
  previewImage: string;
}


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
