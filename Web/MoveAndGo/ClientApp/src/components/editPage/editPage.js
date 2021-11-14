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
      <form className="editForm" encType="multipart/form-data" accesskeymethod="Post" action="/api/account/editprofile" method="post">
        <h1 className="editForm-title">Edit profile</h1>
        <div className="editForm-block">
          <span className="editForm-label">Avatar</span>
          <input
            className="editForm-input editForm-avatar"
            type="file"
            name="avatar"
            tabIndex="1"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Full Name</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="text"
            defaultValue={data?.fullName}
            name="fullname"
            tabIndex="2"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Bio</span>
          <textarea
            minLength="4"
            maxLength="200"
            className="editForm-input editForm-textarea"
            name="bio"
            defaultValue={data?.biographi ?? ""}
            tabIndex="3"
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
            defaultValue={data?.email}
            tabIndex="4"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Phone number</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="tel"
            name="phonenumber"
            defaultValue={data?.phoneNumber ?? ""}
            tabIndex="5"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">New password</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="password"
            name="newpassword"
            tabIndex="6"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Confirm new password</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="password"
            name="confirmnewpassword"
            tabIndex="7"
          />
        </div>
        <div className="editForm-block">
          <span className="editForm-label">Old password</span>
          <input
            minLength="4"
            maxLength="32"
            className="editForm-input"
            type="password"
            name="oldpassword"
            tabIndex="8"
            required
          />
        </div>
        <button className="editForm-btn" tabIndex="9">Submit</button>
      </form>
    </div>
  );
}