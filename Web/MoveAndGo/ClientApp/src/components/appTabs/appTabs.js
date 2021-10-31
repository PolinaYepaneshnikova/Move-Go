import React, { useState } from 'react';
import './appTabs.scss';
import CardWorkout from '../cardWorkout/cardWorkout';

export default function AppTabs() {
  const [active, setActive] = useState(1);

  const tabItems = [
    {
      id: 1,
      title: 'Workouts',
      content: <CardWorkout key={1} />
    },
    {
      id: 2,
      title: 'Articles',
      content: '2'
    }
  ];

  const content = tabItems.map(({ id, content }) => {
    return active === id ? content : null;
  });

  const tabs = tabItems.map(({ id, title }) => {
    let className = active === id ? 'appTabs-tabItem active' : 'appTabs-tabItem';
    return (
      <span
        key={id}
        title={title}
        className={className}
        onClick={() => setActive(id)}
      >
        {title}
      </span>
    )
  });

  return (
    <div className="appTabs">
      <div className="appTabs-tabs">
        {tabs}
      </div>
      <ul className="appTabs-content">
        {content}
      </ul>
    </div>
  )
}