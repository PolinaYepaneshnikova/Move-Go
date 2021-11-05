import React from 'react';
import { Link } from 'react-router-dom';

export default function AddPage() {
  return (
    <div className="startPage">
      <div className="startPage-body">
        <div className="startPage-btn">
          <Link
            className="startPage-link animated-button btn-sm"
            to="/addWorkout"
          >
            <span className="startPage-text">Workout</span>
          </Link>
          <Link
            className="startPage-link"
            to="/addArticle"
          >
            <span className="startPage-text">Article</span>
          </Link>
        </div>
      </div>
    </div>
  );
}