import {JSX} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

export type TabNavItemProps = {
  id: string;
  title: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function TabNavItem({id, title, activeTab, setActiveTab}: TabNavItemProps): JSX.Element {
  function handleClick() {
    setActiveTab(id);
  }

  return (
    <li className={classNames('film-nav__item', {'film-nav__item--active': activeTab === id})} onClick={handleClick}>
      <Link to={'#'} className="film-nav__link">{title}</Link>
    </li>
  );
}
