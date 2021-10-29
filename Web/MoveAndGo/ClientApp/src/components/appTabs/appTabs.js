import React, { useState } from 'react';
import './appTabs.scss';

const tabItems = [
  {
    id: 1,
    title: 'Workouts',
    content: 'step 1 content',
  },
  {
    id: 2,
    title: 'Articles',
    content: 'step 2 content',
  }
];

export default function AppTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="appTabs">
      <div className="appTabs-tabs">
        {
          tabItems.map(({ id, title }) => {
            return <TabItemComponent
              key={title}
              title={title}
              onItemClicked={() => setActive(id)}
              isActive={active === id}
            />
          })
        }
      </div>
      <div className="appTabs-content">
        {
          tabItems.map(({ id, content }) => {
            return active === id ? content : null
          })
        }
      </div>
    </div>
  )
}

const TabItemComponent = ({
  title = '',
  onItemClicked = () => console.error('You passed no action to the component'),
  isActive = true,
}) => {
  return (
    <div className={isActive ? 'appTabs-tabItem active' : 'appTabs-tabItem'} onClick={onItemClicked}>
      <span className='appTabs-contents'>{title}</span>
    </div>
  )
};