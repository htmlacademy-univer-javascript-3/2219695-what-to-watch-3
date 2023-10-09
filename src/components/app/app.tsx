import MainPage from '../../pages/main/main-page.tsx';
import React from 'react';
import {MainPageProps} from '../../pages/main/main-page.props.ts';

export default function App({filmCardProps, smallFilmsCards}: MainPageProps): React.JSX.Element {
  return (
    <MainPage filmCardProps={filmCardProps} smallFilmsCards={smallFilmsCards}/>
  );
}
