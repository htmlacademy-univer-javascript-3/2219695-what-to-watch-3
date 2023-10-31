import {JSX} from 'react';

export type TabContentProps = {
  id: string;
  activeTab: string;
  children: JSX.Element;
}

export default function TabContent({id, activeTab, children}: TabContentProps): JSX.Element | null {
  return (
    activeTab === id ?
      <div>
        { children }
      </div>
      : null
  );
}
