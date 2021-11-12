import React, { useState, useEffect } from "react";
import './editPage.scss';
import getRequest from "../../services/getRequest";

export default function EditPage() {
  const [data, setData] = useState(null);

  useEffect(() => currentData(), []);

  const onSuccess = (data) => {
    setData(data);
  }

  const currentData = () => {
    getRequest('/api/account/currentuser')
      .then(onSuccess);
  }
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
            value={data?.fullName ?? ""}
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
            value={data?.userName}
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
            value={data?.biographi ?? ""}
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
            value={data?.email ?? ""}
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
            value={data?.phoneNumber ?? ""}
            tabIndex="5"
            required
          />
        </div>
        <button className="editForm-btn" tabIndex="6">Submit</button>
      </form>
    </div>
  );
}