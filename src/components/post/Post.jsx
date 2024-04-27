import React from "react";
import "../../styles/post.css";
import post1 from "../../images/IMG-20221220-WA0043.jpg";
const post = () => {
  return (
    <>
      <div className="postmain">
        <div className="feedopt">
          <div className="follow">
            <div className="follow_items">For you</div>
          </div>
          <div className="follow">
            <div className="follow_items">Following</div>
          </div>
        </div>

        <div className="text-box">
          <div className="profile"></div>
          <input
            type="text"
            className="textinput"
            placeholder="What is happening?"
          />
        </div>
        <div className="reply">
          <i className="fa-solid fa-earth earth" />
          Everyone can reply
        </div>

        <div className="icons">
          <i className="fa-regular fa-image iconn img" />
          <i className="fa-solid fa-image iconn" />
          <i className="fa-solid fa-bars-progress iconn" />
          <i className="fa-regular fa-face-smile iconn" />
          <i className="fa-regular fa-calendar iconn" />
          <i className="fa-solid fa-location-dot iconn" />
          <div className="submitt">Post</div>
        </div>
        <div className="show">Show 3 posts</div>

        <div className="post">
          <div className="post_user">
            <div className="profile"></div>
            <div className="content">
              <div className="user">
                <div className="pname">Viral Modi</div>
                <div className="puname">@Vanshika04</div>
              </div>
              <div className="caption">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                adipisci sunt in?
              </div>
            </div>
          </div>{" "}
          {/*post-user end */}
          <div className="post_file">
            <div className="post_view">
              <img src={post1} alt="error" className="postimg" />
            </div>
            <div className="activity_section">
              <i className="fa-regular fa-comment activity" />
              <span className="count">345</span>
              <i className="fa-regular fa-heart activity" />
              <span className="count">435</span>
              <i className="fa-regular fa-eye activity" />
              <span className="count">890</span>
            </div>
          </div>
        </div>
        <div className="post">
          <div className="post_user">
            <div className="profile"></div>
            <div className="content">
              <div className="user">
                <div className="pname">Viral Modi</div>
                <div className="puname">@Vanshika04</div>
              </div>
              <div className="caption">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
                adipisci sunt in?
              </div>
            </div>
          </div>{" "}
          {/*post-user end */}
          <div className="post_file">
            <div className="post_view">
              <img src={post1} alt="error" className="postimg" />
            </div>
            <div className="activity_section">
              <i className="fa-regular fa-comment activity" />
              <span className="count">345</span>
              <i className="fa-regular fa-heart activity" />
              <span className="count">435</span>
              <i className="fa-regular fa-eye activity" />
              <span className="count">890</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default post;
