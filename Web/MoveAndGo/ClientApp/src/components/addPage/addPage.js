import React from 'react';
import { Link } from 'react-router-dom';
import './addPage.scss';

export default function AddPage() {
  return (
    <div className="addPage">
      <div className="addPage-body">
        <div className="addPage-btn">
          <Link
            className="addPage-link"
            to="/addWorkout"
          >
            <span className="addPage-text">Workout</span>
          </Link>
          <Link
            className="addPage-link"
            to="/addArticle"
          >
            <span className="addPage-text">Article</span>
          </Link>
        </div>
      </div>
    </div>
  );
}