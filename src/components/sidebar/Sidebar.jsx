import React from 'react';
import "../../styles/sidebar.css";

const Sidebar = () => {
  return (
   <>  
    <div className='sidemain'>
    
   
            <i className="fa-brands fa-twitter logo" />
        
          <ul>
           
            <div className="items"><i className="fa-solid fa-house icon" />Home</div>
            <div className="items"><i className="fa-solid fa-magnifying-glass icon" />Explore</div>
            <div className="items"> <i className="fa-solid fa-bell icon" />Notifications</div>
            <div className="items"><i className="fa-solid fa-envelope icon" />Messages</div>
            <div className="items"><i className="fa-solid fa-bell icon" />Grok</div>
            <div className="items"><i className="fa-solid fa-list icon" />Lists</div>
            <div className="items"><i className="fa-solid fa-users icon" />Communities</div>
            <div className="items"><i className="fa-solid fa-star icon" />Premium</div>
            <div className="items"><i className="fa-solid fa-user icon" />Profile</div>
            <div className="items"><i className="fa-solid fa-ellipsis icon" />More</div>
          </ul>
       
        <div className="submit">Post</div>
    </div>
    </>

  )
}

export default Sidebar
