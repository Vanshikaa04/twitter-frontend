import React, { useEffect, useState } from "react";
import "../../styles/post.css";
import { NewPost } from "./NewPost";
import axios from "axios";
import Cookies from "js-cookie";
import defImg from '../../images/default.jpg'
import { Modal, Button, Form } from 'react-bootstrap';
import { useUser } from "../context/UserContext";


export const Post = () => {

  const user = useUser();

  const [userLikes, setUserLikes] = useState([])
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState('')
  // for sending updated post info in the form of form data!
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState(null)
  const [newComment, setNewComment] = useState(null)
  const [comments, setComments] = useState([])
  const [replies, setReplies] = useState([])
  // for replying to a comment
  const [replyInput, setReplyInput] = useState({});
  const [replyContent, setReplyContent] = useState('');

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

  const handleOpenModal = (post, action) => {
    console.log('handle open modal called!')
    setSelectedPost(post);
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setModalAction('');
    setNewDescription('');
    setNewImage(null);
    setComments([]);
    setReplies([]);
  };

  const handleUpdatePost = async () => {
    console.log('handle post update called!')

    if (modalAction === 'updateDescription') {
      console.log('in handle new description update')
      try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('description', newDescription);
        const response = await axios.patch(`http://localhost:3008/blog/${selectedPost._id}/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
        )
        console.log('response from update api ', response)
      } catch (error) {
        console.log(error)
      }
    }
    else if (modalAction === 'updateImage') {
      console.log('in handle new image for post update method!')
      try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('file', newImage);
        const response = await axios.patch(`http://localhost:3008/blog/${selectedPost._id}/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
        )
        console.log('response from update api ', response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts();
    handleCloseModal();
  };

  const handleDeletePost = async () => {
    console.log('in delete post method')
    try {
      const token = Cookies.get('token');
      const resposne = await axios.delete(`http://localhost:3008/blog/${selectedPost._id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(resposne?.data)
    } catch (error) {
      console.log('Error deleting post:', error);
    }
    fetchPosts();
    handleCloseModal();
  };

  const handleLikePost = async (blogId) => {
    console.log("handle like post called!")
    console.log("blogId in like post method ", blogId)
    try {
      const token = Cookies.get('token')
      await axios.patch(`http://localhost:3008/blog/${blogId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log('some error occured!')
    }
    fetchPosts();
  }

  const isLikedByUser = (likedByArray) => {
    const isLiked = likedByArray.includes(user?._id);
    return isLiked;
  };

  const showPostLikes = async (blogId) => {
    console.log('show post likes method called!')
    console.log('blogId in showPostLikes ', blogId)

    try {
      const token = Cookies.get('token')
      const response = await axios.get(`http://localhost:3008/blog/${blogId}/getlikes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('api response of showPostLikes ', response?.data?.data)
      setUserLikes(response?.data?.data)
      setIsModalOpen(true)
      setModalAction('showLikes')
    } catch (error) {
      console.log("error occured!!")
    }
  }

  const handleCommentOnPost = async () => {
    console.log("handle comment on post method called!")
    console.log("blog id in comment post method ", selectedPost._id)
    try {
      const token = Cookies.get('token')
      console.log("new Comment -> ", newComment)
      const commentData = { content: newComment }
      const response = await axios.post(`http://localhost:3008/blog-comment/${selectedPost._id}`,
        commentData
        , {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
          }
        })
      console.log('api response of adding a comment', response?.data)
      fetchPosts()
      handleCloseModal()
    } catch (error) {
      console.log("some boom boom occured!")
    }
  }

  const showPostComments = async (post) => {
    console.log("in fetch comments for the post method frontend!")
    setSelectedPost(post)
    try {
      const token = Cookies.get('token');
      console.log('token in showPostComments ', token)
      console.log('post id in showPostComments', post._id)
      const response = await axios.get(`http://localhost:3008/blog-comment/${post._id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      });
      console.log('Fetched comments:', response?.data?.data);
      setComments(response?.data?.data);
      setIsModalOpen(true)
      setModalAction('showComments')
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const showRepliesOfComments = async (parentCommentId) => {
    console.log("in fetch replies for the comments method frontend!")
    try {
      const token = Cookies.get('token');
      console.log('token in showPostComments ', token)
      console.log('post id in showPostComments', parentCommentId)
      const response = await axios.get(`http://localhost:3008/blog-comment/${parentCommentId}/comments/parent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'application/json'
        }
      });
      console.log('Fetched replies:', response?.data?.data);
      setReplies(response?.data?.data);
      setIsModalOpen(true)
      setModalAction('showReplies')
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleReplyButtonClick = (commentId) => {
    setReplyInput((prev) => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleReplyOnComment = async (parentId) => {
    console.log("handle reply on comment method called!")
    console.log('parentComment id is ', parentId)
    console.log('blog id is ', selectedPost._id)
    try {
      const token = Cookies.get('token')
      console.log("reply content -> ", replyContent)
      const replyData = { content: replyContent, parentCommentId: parentId }
      const response = await axios.post(`http://localhost:3008/blog-comment/${selectedPost._id}`,
        replyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
          }
        })
      console.log('api response of adding a reply', response?.data)
      fetchPosts()
      handleCloseModal()
    } catch (error) {
      console.log("some boom boom occured!")
    }
  }

  const handleLikeComment = async (commentId) => {
    console.log("handle like comment called!")
    console.log("commentId in like post method ", commentId)
    try {
      const token = Cookies.get('token')
      await axios.patch(`http://localhost:3008/blog-comment/${commentId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.log('some error occured!')
    }
    fetchPosts();
  }

  useEffect(() => {
    console.log('in useEffect of getting posts')
    console.log('length posts ', posts.length)
    fetchPosts()
  }, []);

  const PostComponent = ({ post, index }) => {
    const isUserPost = post.userId._id === user._id
    return (
      <div className="post">
        <div className="post_user">
          <img src={post.userId.profilePicture} alt={defImg} className="profile" />
          <div className="content">
            <div className="user">
              <div className="pname">{post.userId.first_name} {post.userId.last_name}</div>
              <div className="puname">@{post.userId.first_name[0]}{post.userId.last_name[0]}</div>
            </div>
            <div className="caption">
              {post.description}
            </div>
          </div>
          {isUserPost && (
            <div className="opt">
              <i className="fa-solid fa-ellipsis" onClick={() => handleOpenModal(post, 'options')}></i>
            </div>
          )
          }
        </div>
        <div className="post_file">
          <div className="post_view">
            <img src={post.blogPicture} alt="error" className="postimg" />
          </div>
          <div className="activity_section">
            <i className="fa-regular fa-comment activity" onClick={() => handleOpenModal(post, 'comment')} />
            <span className="count" onClick={() => showPostComments(post)}>{post.comments}</span>
            {isLikedByUser(post.likedBy)}
            <i
              className={`fa-${isLikedByUser(post.likedBy) ? 'solid' : 'regular'} fa-heart activity`}
              onClick={() => handleLikePost(post.blogId)}
            />
            <span className="count" onClick={() => showPostLikes(post.blogId)}>{post.likes}</span>
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
      {/* Modal */}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalAction === 'showLikes' ? 'Likes' : 'showComments' ? 'Comments' : 'showReplies' ? 'Replies' : 'Post Options'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            modalAction === 'options' &&
            (
              <div className="d-flex flex-column">
                <Button className="mb-2" variant="primary" onClick={() => setModalAction('updateDescription')}>Update Description</Button>
                <Button className="mb-2" variant="primary" onClick={() => setModalAction('updateImage')}>Update Image</Button>
                <Button className="mb-2" variant="danger" onClick={handleDeletePost}>Delete Post</Button>
              </div>
            )}
          {
            modalAction === 'updateDescription' &&
            (
              <Form>
                <Form.Group controlId="formDescription">
                  <Form.Label>Update Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter new description"
                    value={newDescription || ''}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdatePost}>Save Changes</Button>
              </Form>
            )}
          {
            modalAction === 'updateImage' &&
            (
              <Form>
                <Form.Group controlId="formFile">
                  <Form.Label>Update Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleUpdatePost}>Save Changes</Button>
              </Form>
            )}
          {
            modalAction === 'showLikes' &&
            (
              <div>
                {
                  userLikes?.map((user) => {
                    return (
                      <div key={user._id} className="liked-user">
                        <img src={user.profilePicture || defImg} alt="Profile" className="profile" />
                        <span>{user.first_name} {user.last_name}</span>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          {
            modalAction === 'comment' &&
            (
              <Form>
                <Form.Group controlId="formComment">
                  <PostComponent post={selectedPost} />
                  <Form.Control
                    type="text"
                    placeholder="Post Your Thoughts"
                    value={newComment || ''}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleCommentOnPost}>Submit Comment</Button>
              </Form>
            )}
          {
            modalAction === 'showComments' && (
              <div>
                {
                  comments.map((comment) => {
                    return (
                      <div key={comment._id} className="comment">
                        <img src={comment.userId.profilePicture || defImg} alt="Profile" className="profile" />
                        <div className="comment_content">
                          <div className="user">
                            <div className="pname">{comment.userId.first_name} {comment.userId.last_name}</div>
                          </div>
                          <div className="comment_text">
                            {comment.content}
                          </div>
                          <div className="activity_section">
                            <i className="fa-regular fa-comment activity" onClick={() => showRepliesOfComments(comment._id)} />
                            <span className="count" onClick={() => handleReplyButtonClick(comment._id)}>{comment.replies}</span>
                            {isLikedByUser(comment.likedBy)}
                            <i
                              className={`fa-${isLikedByUser(comment.likedBy) ? 'solid' : 'regular'} fa-heart activity`}
                              onClick={() => handleLikeComment(comment._id)}
                            />
                            <span className="count">{comment.commentLikes}</span>
                            <i className="fa-regular fa-calendar-days activity" />
                            <span className="count">{timeSince(comment.createdAt)}</span>
                          </div>
                          {replyInput[comment._id] && (
                            <div className="reply_input">
                              <Form.Control
                                type="text"
                                placeholder="Write your reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                              />
                              <Button onClick={() => handleReplyOnComment(comment._id)}>Submit Reply</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          {
            modalAction === 'showReplies' && (
              <div>
                {replies.map((reply) => {
                  return (
                    <div key={reply._id} className="comment">
                      <img src={reply.userId.profilePicture || defImg} alt="Profile" className="profile" />
                      <div className="comment_content">
                        <div className="user">
                          <div className="pname">{reply.userId.first_name} {reply.userId.last_name}</div>
                        </div>
                        <div className="comment_text">
                          {reply.content}
                        </div>
                        <div className="activity_section">
                          <i className="fa-regular fa-comment activity" onClick={() => showRepliesOfComments(reply._id)} />
                          <span className="count" onClick={() => handleReplyButtonClick(reply._id)}>{reply.replies}</span>
                          {isLikedByUser(reply.likedBy)}
                          <i
                            className={`fa-${isLikedByUser(reply.likedBy) ? 'solid' : 'regular'} fa-heart activity`}
                            onClick={() => handleLikeComment(reply._id)}
                          />
                          <span className="count">{reply.commentLikes}</span>
                          <i className="fa-regular fa-calendar-days activity" />
                          <span className="count">{timeSince(reply.createdAt)}</span>
                        </div>
                        {replyInput[reply._id] && (
                          <div className="reply_input">
                            <Form.Control
                              type="text"
                              placeholder="Write your reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <Button onClick={() => handleReplyOnComment(reply._id)}>Submit Reply</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};