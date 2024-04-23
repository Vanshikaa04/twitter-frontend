import React from "react";
import "../../styles/home.css";
import Sidebar from './../sidebar/Sidebar';
import Post from './../post/Post';
import Notify from './../notification/Notify';


const HomeScreen = () => {
    return (
      <div className="main">
       <Sidebar/>
       <Post />
       <Notify/>
       
      
      </div>
    );
  };
  
  export default HomeScreen;