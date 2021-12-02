import React, {useState, useEffect} from "react";
import getRequest from '../../services/getRequest';

const FilterWorkout = ({updateData}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        updateData(data);
    }, [updateData, data]);

    const onSuccess = (data) => {
        setData(data);
    }

    const filterWorkout = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        getRequest(`/api/search/workouts?${new URLSearchParams(data)}`)
            .then(onSuccess);
    }

    return (
        <form className="form" onSubmit={filterWorkout}>
            <h1 className="form-title">Filter</h1>
            <div className="form-block">
                <span className="form-label">Search</span>
                <input type="text" name="keyWords" className="form-input"/>
            </div>
            <div className="form-block">
                <span className="form-label">Type</span>
                <input type="text" name="type" className="form-input"/>
            </div>
            <div className="form-block">
                <span className="form-label">Level</span>
                <input type="text" name="level" className="form-input"/>
            </div>
            <button className="form-btn">Search</button>
        </form>
    );
}

export default FilterWorkout;