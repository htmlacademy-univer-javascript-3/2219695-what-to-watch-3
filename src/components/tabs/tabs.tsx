import {JSX, useState} from 'react';
import TabNavItem from '../tab-nav-item/tab-nav-item.tsx';
import TabContent from '../tab-content/tab-content.tsx';
import Overview from '../overview/overview.tsx';
import Details from '../details/details.tsx';
import {ReviewData} from '../../types/reviewData.ts';
import Reviews from '../reviews/reviews.tsx';

export type TabsProps = {
  rating: number;
  description: string;
  director: string;
  scoresCount: number;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  reviews: ReviewData[];
}

export default function Tabs({rating, description, director, scoresCount, starring, runTime, genre, released, reviews}: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="film-card__desc" data-testid="tabContainer">
      <nav className="film-nav film-card__nav" data-testid="tabNavContainer">
        <ul className="film-nav__list">
          <TabNavItem title="Overview" id="overview" activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title="Details" id="details" activeTab={activeTab} setActiveTab={setActiveTab}/>
          <TabNavItem title="Reviews" id="reviews" activeTab={activeTab} setActiveTab={setActiveTab}/>
        </ul>
      </nav>

      <TabContent id="overview" activeTab={activeTab}>
        <Overview
          rating={rating}
          description={description}
          director={director}
          scoresCount={scoresCount}
          starring={starring}
        />
      </TabContent>
      <TabContent id="details" activeTab={activeTab}>
        <Details
          director={director}
          starring={starring}
          runTime={runTime}
          genre={genre}
          released={released}
        />
      </TabContent>
      <TabContent id="reviews" activeTab={activeTab}>
        <Reviews
          reviews={reviews}
        />
      </TabContent>
    </div>
  );
}
