import React, {useState, useEffect} from 'react';
import FilterWorkout from '../filterWorkout/filterWorkout';
import getRequest from '../../services/getRequest';

import './appTabs.scss';

import CardWorkout from '../cardWorkout/cardWorkout';

const AppTabs = () => {
    const [active, setActive] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        getRequest("/api/workout/get")
            .then((data) => {
                setData(data);
            })
    })

    const updateData = (data) => {
        setData(data);
    }

    const tabItems = [
        {
            id: 1,
            title: 'Workouts',
            content: <CardWorkout data={data} key={1}/>,
            filter: <FilterWorkout updateData={updateData} key={2}/>
        },
        {
            id: 2,
            title: 'Articles',
            content: '2',
            filter: "2"
        }
    ];

    const content = tabItems.map(({id, content}) => {
        return active === id ? content : null;
    });

    const filter = tabItems.map(({id, filter}) => {
        return active === id ? filter : null;
    })

    const tabs = tabItems.map(({id, title}) => {
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