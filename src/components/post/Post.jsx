import React, { useEffect, useState } from "react";
import "../../styles/post.css";
import post1 from "../../images/IMG-20221220-WA0043.jpg";
import { NewPost } from "./NewPost";
import axios from "axios";
import Cookies from "js-cookie";
import defImg from '../../images/default.jpg'

export const Post = () => {
  const [posts, setPosts] = useState([])
  function timeSince(date) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  
  const fetchPosts = async () => {
    const token = Cookies.get('token');
    console.log('token is ', token)
    try {
      const response = await axios.get('http://localhost:3008/blog/getAllBlogs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('api response ', response?.data?.data)
      setPosts(response?.data?.data)
      console.log('posts ', posts)
    } catch (error) {
      console.log('error fetching posts')
    }
  }
  useEffect(() => {
    console.log('in useeffect of getting posts')
    console.log('length posts ', posts.length)
    fetchPosts()
  }, []);

  const PostComponent = ({ post, index }) => {
    return (
      <div className="post">
        <div className="post_user">
        <img src={post.userId.profilePicture} alt={defImg} className="profile"/>
          <div className="content">
            <div className="user">
              <div className="pname">{post.userId.first_name} {post.userId.last_name}</div>
              <div className="puname">@{post.userId.first_name[0]}{post.userId.last_name[0]}</div>
            </div>
            <div className="caption">
              {post.description}
            </div>
          </div>
        </div>
        <div className="post_file">
          <div className="post_view">
            <img src={post1} alt="error" className="postimg" />
          </div>
          <div className="activity_section">
            <i className="fa-regular fa-comment activity" />
            <span className="count">{post.comments}</span>
            <i className="fa-regular fa-heart activity" />
            <span className="count">{post.likes}</span>
            <i className="fa-regular fa-calendar-days activity" />
            <span className="count">{timeSince(post.datetime)}</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="postmain">
        <NewPost />
        <div className="show">Show {posts.length} posts</div>
        {
          posts?.map((post, index) => {
            return (
              <PostComponent key={index} post={post} index={index + 1} />
            )
          })
        }
      </div>
    </>
  );
};
