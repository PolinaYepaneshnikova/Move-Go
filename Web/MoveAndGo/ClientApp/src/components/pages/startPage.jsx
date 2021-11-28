import React from "react";
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <div className="startPage">
      <div className="startPage-body">
        <h1 className="startPage-title">{"Move&GO"}</h1>
        <div className="startPage-btn">
          <Link
            className="startPage-link animated-button btn-sm"
            to="/login"
          >
            <i className="fas fa-user startPage-icon"></i>
            <span className="startPage-text">Log In</span>
          </Link>
          <Link
            className="startPage-link"
            to="/signup"
          >
            <i className="fas fa-user-plus startPage-icon"></i>
            <span className="startPage-text">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
