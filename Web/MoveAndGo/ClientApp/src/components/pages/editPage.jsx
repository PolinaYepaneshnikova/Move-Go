import React, { useState, useEffect } from "react";

import getRequest from "../../services/getRequest";

const EditPage = () => {
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
    <div className="form-body">
      <form className="form" encType="multipart/form-data" accesskeymethod="Post" action="/api/account/editprofile" method="post">
        <h1 className="form-title">Edit profile</h1>
        <div className="form-block">
          <span className="form-label">Avatar</span>
          <input
            className="form-input form-avatar"
            type="file"
            name="avatar"
            tabIndex="1"
          />
        </div>
        <div className="form-block">
          <span className="form-label">Full Name</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            defaultValue={data?.fullName}
            name="fullname"
            tabIndex="2"
          />
        </div>
        <div className="form-block">
          <span className="form-label">Bio</span>
          <textarea
            minLength="4"
            maxLength="200"
            className="form-input form-textarea"
            name="bio"
            defaultValue={data?.biographi ?? ""}
            tabIndex="3"
          ></textarea>
        </div>
        <div className="form-block">
          <span className="form-label">Email</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="email"
            name="email"
            defaultValue={data?.email}
            tabIndex="4"
          />
        </div>
        <div className="form-block">
          <span className="form-label">Phone number</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="tel"
            name="phonenumber"
            defaultValue={data?.phoneNumber ?? ""}
            tabIndex="5"
          />
        </div>
        <div className="form-block">
          <span className="form-label">New password</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="password"
            name="newpassword"
            tabIndex="6"
          />
        </div>
        <div className="form-block">
          <span className="form-label">Confirm new password</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="password"
            name="confirmnewpassword"
            tabIndex="7"
          />
        </div>
        <div className="form-block">
          <span className="form-label">Old password</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="password"
            name="oldpassword"
            tabIndex="8"
            required
          />
        </div>
        <button className="form-btn" tabIndex="9">Submit</button>
      </form>
    </div>
  );
}

export default EditPage;