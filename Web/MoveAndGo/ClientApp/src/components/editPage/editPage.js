import React from "react";
import './editPage.scss';

export default function EditPage() {
  return (
    <div className="editForm-body">
      <form className="editForm">
        <h1 className="editForm-title">Edit profile</h1>
        <div className="editForm-block">
          <span className="editForm-label">Avatar</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input editForm-avatar"
            type="file"
            name="avatar"
            tabIndex="1"
            required
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Name</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="text"
            name="fullname"
            tabIndex="1"
            required
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Nickname</span>
          <input
            className="editForm-input"
            type="text"
            name="nickname"
            tabIndex="2"
            value={localStorage.getItem('nickname')}
            required
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Bio</span>
          <textarea
            minLength="4"
            maxLength="32"
            className="editForm-input editForm-textarea"
            type="text"
            name="bio"
            tabIndex="3"
            required
          ></textarea>
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Email</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="email"
            name="email"
            tabIndex="4"
            required
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Phone number</span>
          <input
            minLength="4"
            maxLength="200"
            className="editForm-input"
            type="tel"
            name="phonenumber"
            tabIndex="5"
            required
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Gender</span>
          <input
            minLength="4"
            maxLength="200"
            className="editForm-input"
            type="text"
            name="gender"
            tabIndex="6"
            required
          />
        </div>
        <button className="editForm-btn" tabIndex="7">Submit</button>
      </form>
    </div>
  );
}