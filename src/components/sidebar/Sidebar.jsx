import React, { useState, useEffect } from 'react';
import "../../styles/sidebar.css";
import axios from "axios";
import Cookies from "js-cookie";
import defImg from '../../images/default.jpg'
import { useUser } from '../context/UserContext';

export const Sidebar = () => {
  // context
  const user = useUser();

  const handleProfilePictureClick = () => {
    document.getElementById('profilePicInput').click();
  }

  const handleProfilePictureChange = async (event) => {
    console.log('event target ', event.target)
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const token = Cookies.get('token')
      try {
        const response = await axios.post('http://localhost:3008/user/update-profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log('error occured while updating profile picture!')
      }
    }
  }
  return (
    <>
      <div className='sidemain'>
        <i className="fa-brands fa-x-twitter logo" />
        <ul>
          <div className="items"><i className="fa-solid fa-house icon" />Home</div>
          <div className="items"><i className="fa-solid fa-magnifying-glass icon" />Explore</div>
          <div className="items"> <i className="fa-regular fa-bell icon" />Notifications</div>
          <div className="items"><i className="fa-regular fa-envelope icon" />Messages</div>
          <div className="items"><i className="fa-solid fa-list icon" />Lists</div>
          <div className="items"><i className="fa-brands fa-x-twitter icon" />Premium</div>
          <div className="items"><i className="fa-regular fa-user icon" />Profile</div>
          <div className="items"><i className="fa-solid fa-ellipsis icon" />More</div>
        </ul>

        <div className="submit">Post</div>

        <div className="account">
          <img src={user?.profilePicture} alt={defImg} className="pfp" onClick={handleProfilePictureClick} />
          <input
            type="file"
            id="profilePicInput"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
          <div className="id">
            <div className="name">{user?.first_name} {user?.last_name}</div>
            <div className="uname">@{user?.first_name[0]}{user?.last_name[0]}</div>
          </div>
          {/* <div className="opt"><i className="fa-solid fa-ellipsis" /></div> */}
        </div>
      </div>
    </>

  )
}
