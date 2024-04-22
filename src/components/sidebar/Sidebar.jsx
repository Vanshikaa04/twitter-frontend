import React from 'react';
import "../../styles/sidebar.css";

const Sidebar = () => {
  return (
   <>  
    <div className='sidemain'>
    
   
            <i className="fa-brands fa-x-twitter logo" />
        
          <ul>
           
            <div className="items"><i className="fa-solid fa-house icon" />Home</div>
            <div className="items"><i className="fa-solid fa-magnifying-glass icon" />Explore</div>
            <div className="items"> <i className="fa-regular fa-bell icon" />Notifications</div>
            <div className="items"><i className="fa-regular fa-envelope icon" />Messages</div>
            <div className="items"><i className="fa-regular fa-bell icon" />Grok</div>
            <div className="items"><i className="fa-solid fa-list icon" />Lists</div>
            <div className="items"><i className="fa-solid fa-users icon" />Communities</div>
            <div className="items"><i className="fa-brands fa-x-twitter icon" />Premium</div>
            <div className="items"><i className="fa-regular fa-user icon" />Profile</div>
            <div className="items"><i className="fa-solid fa-ellipsis icon" />More</div>
          </ul>
       
        <div className="submit">Post</div>

        <div className="account">
          <div className="pfp"></div>
          <div className="id">
            <div className="name">Viral Modi</div>
            <div className="uname">@Vanshika04</div>
          </div>
        <div className="opt"><i className="fa-solid fa-ellipsis" /></div> 
        </div>
    </div>
    </>

  )
}

export default Sidebar
