import React from 'react'
import "../../styles/post.css"

export const NewPost = () => {
    return (
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
        </div>
    )
}
