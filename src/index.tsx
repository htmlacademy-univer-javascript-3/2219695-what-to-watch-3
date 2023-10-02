import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {MainPageProps} from './pages/main/main-page.props.ts';

const mainPageProps: MainPageProps = {
  filmCardProps: {
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    date: '2014'
  },
  smallFilmsCards: [
    {
      id: 1,
      imgSrc: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
      name: 'Fantastic Beasts: The Crimes of Grindelwald'
    },
    {
      id: 2,
      imgSrc: 'img/bohemian-rhapsody.jpg',
      name: 'Bohemian Rhapsody'
    },
    {
      id: 3,
      imgSrc: 'img/macbeth.jpg',
      name: 'Macbeth'
    },
    {
      id: 4,
      imgSrc: 'img/aviator.jpg',
      name: 'Aviator'
    },
    {
      id: 5,
      imgSrc: 'img/we-need-to-talk-about-kevin.jpg',
      name: 'We need to talk about Kevin'
    },
    {
      id: 6,
      imgSrc: 'img/what-we-do-in-the-shadows.jpg',
      name: 'What We Do in the Shadows'
    },
    {
      id: 7,
      imgSrc: 'img/revenant.jpg',
      name: 'Revenant'
    },
    {
      id: 8,
      imgSrc: 'img/johnny-english.jpg',
      name: 'Johnny English'
    },
    {
      id: 9,
      imgSrc: 'img/shutter-island.jpg',
      name: 'Shutter Island'
    },
    {
      id: 10,
      imgSrc: 'img/pulp-fiction.jpg',
      name: 'Pulp Fiction'
    },
    {
      id: 11,
      imgSrc: 'img/no-country-for-old-men.jpg',
      name: 'No Country for Old Men'
    },
    {
      id: 12,
      imgSrc: 'img/snatch.jpg',
      name: 'Snatch'
    },
    {
      id: 13,
      imgSrc: 'img/moonrise-kingdom.jpg',
      name: 'Moonrise Kingdom'
    },
    {
      id: 14,
      imgSrc: 'img/seven-years-in-tibet.jpg',
      name: 'Seven Years in Tibet'
    },
    {
      id: 15,
      imgSrc: 'img/midnight-special.jpg',
      name: 'Midnight Special'
    },
    {
      id: 16,
      imgSrc: 'img/war-of-the-worlds.jpg',
      name: 'War of the Worlds'
    },
    {
      id: 17,
      imgSrc: 'img/dardjeeling-limited.jpg',
      name: 'Dardjeeling Limited'
    },
    {
      id: 18,
      imgSrc: 'img/orlando.jpg',
      name: 'Orlando'
    },
    {
      id: 19,
      imgSrc: 'img/mindhunter.jpg',
      name: 'Mindhunter'
    },
    {
      id: 20,
      imgSrc: 'img/midnight-special.jpg',
      name: 'Midnight Special'
    }
  ]
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmCardProps={mainPageProps.filmCardProps} smallFilmsCards={mainPageProps.smallFilmsCards}/>
  </React.StrictMode>
);
