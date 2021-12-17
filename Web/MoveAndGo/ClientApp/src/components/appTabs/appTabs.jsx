import React, { useState } from 'react';
import CardWorkout from '../cardWorkout/cardWorkout';
import FilterWorkout from '../filterWorkout/filterWorkout';
import CardArticle from '../cardArticle/cardArticle';
import FilterArticle from '../filterArticle/filterArticle';

import './appTabs.scss';

const AppTabs = () => {
    const [active, setActive] = useState(1);
    const [workout, setWorkout] = useState([]);
    const [article, setArticle] = useState([]);


    const updateWorkout = (workout) => {
        setWorkout(workout)
    }

    const updateArticle = (article) => {
        setArticle(article)
    }

    const tabItems = [
        {
            id: 1,
            title: 'Workouts',
            content: <CardWorkout workout={workout} key={1} />,
            filter: <FilterWorkout updateWorkout={updateWorkout} key={2} />
        },
        {
            id: 2,
            title: 'Articles',
            content: <CardArticle article={article} key={3} />,
            filter: <FilterArticle updateArticle={updateArticle} key={4} />
        }
    ];

    const content = tabItems.map(({ id, content }) => {
        return active === id ? content : null;
    });

    const filter = tabItems.map(({ id, filter }) => {
        return active === id ? filter : null;
    })

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
            <div className="appTabs-block">
                <ul className="appTabs-content">
                    {content}
                </ul>
                <aside className="appTabs-filter">
                    {filter}
                </aside>
            </div>
        </div>
    )
}

export default AppTabs;