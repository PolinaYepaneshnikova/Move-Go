import React from "react";
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="homePage">
      <div className="homePage-body">
        <h1 className="homePage-title">{"Move&GO"}</h1>
        <div className="homePage-btn">
          <a
            className="homePage-link animated-button btn-sm"
            href="/login"
          >
            <i class="fas fa-user homePage-icon"></i>
            <span className="homePage-text">Log In</span>
          </a>
          <a
            className="homePage-link"
            href="/signup"
          >
            <i class="fas fa-user-plus homePage-icon"></i>
            <span className="homePage-text">Sign Up</span>
          </a>
        </div>
      </div>
    </div>
  );
}
