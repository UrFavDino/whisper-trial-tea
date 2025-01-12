import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Feed/ufeed.css'; // Ensure the correct path to your CSS file

const Ufeed = ({ selectedPage, posts, setPosts, showLikedOnly }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState({}); // Track comment visibility per post
  const [editPostId, setEditPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  
  // Get the logged-in username from localStorage
  const loggedInUser = localStorage.getItem("username");

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedPage === "Group") {
      return post.visibility === "Private";
    }
    return !showLikedOnly || post.liked;
  });

  const handleCommentToggle = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle visibility of comments for this post
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    alert("Post has been deleted.");
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find(post => post.id === postId);
    setEditPostId(postId);
    setEditedContent(postToEdit.content);
  };

  const handleSaveEdit = () => {
    setPosts(
      posts.map((post) =>
        post.id === editPostId
          ? { ...post, content: editedContent }
          : post
      )
    );
    setEditPostId(null);
    setEditedContent("");
    alert("Post has been edited.");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    }
  };

  const handleAddComment = (postId) => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: Date.now(),
          postId,
          text: newComment,
          liked: false,
          likes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleLikeComment = (id) => {
    setComments(comments.map(comment =>
      comment.id === id
        ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="feed-main">
      {filteredPosts.map((post) => (
        <div key={post.id} className="feed-post">
          <div className="feed-post-uploaded">
            <div className="post-user-details">
              <div className="additionss">
                <div className="just">
                  <div className="post-pfp"></div>
                  <div className="post-fix">
                    <div className="post-username">{post.username}</div>
                    <div className="post-time-uploaded">
                      {post.time}
                      {post.visibility === "Public" ? (
                        <i className="bi bi-globe-asia-australia" id="status-public" style={{ marginLeft: "5px" }}></i>
                      ) : (
                        <i className="bi bi-lock-fill" id="status-private" style={{ marginLeft: "5px" }}></i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="dd">
                  <Dropdown as={ButtonGroup} className="delete-post">
                    <Dropdown.Toggle className="no-arrow" style={{ backgroundColor: 'white', color: 'black', border: 'none' }}>
                      <i className="bi bi-three-dots"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEditPost(post.id)}>Edit <i className="bi bi-pencil"></i></Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDeletePost(post.id)}>Delete <i className="bi bi-trash3"></i></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="post-about">
            <div className="post-about-topic">
    {editPostId === post.id ? (
      <div>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
          style={{
            width: "90%",
            height: "35px",
            resize: "none",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "gray",
            overflow: "hidden"
          }}
        />
      </div>
    ) : (
      <p>{post.content}</p>
    )}

    {/* Display the topic (tag) if it exists */}
    {post.tag && (
      <div className="post-topic" style={{ marginTop: '5px', fontSize: '14px', color: '#007bff' }}>
        #{post.tag}
      </div>
    )}

    {post.image && (
      <div className="post-img">
        <img src={post.image} alt="Uploaded" style={{ width: "200px", maxHeight: "250px", borderRadius: "10px" }} />
      </div>
    )}
  </div>

              <div className="post-reaction">
                <div className="post-like" onClick={() => handleLike(post.id)}>
                  {post.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                  <p style={{ marginLeft: "10px", marginTop: '12px' }}>{post.likes}</p>
                </div>

                <div className="post-comment" onClick={() => handleCommentToggle(post.id)}>
                  <FaRegComment />
                  <p style={{ marginLeft: "10px", marginTop: '13px' }}>
                    {comments.filter(comment => comment.postId === post.id).length}
                  </p>
                </div>
              </div>

              {showComments[post.id] && (
                <div className="post-comments">
                  <div className="comments-list">
                    {comments.filter(comment => comment.postId === post.id).map(comment => (
                      <div key={comment.id} className="comment-item">
                        <div className="comment-item-details">
                          <div className="addition">
                            <div className="comment-item-pfp"></div>
                            <div className="comment-item-username">{loggedInUser}</div> {/* Display logged-in username */}
                            <div className="comment-item-time-uploaded">Just Now</div>
                          </div>
                          <div>
                            <Dropdown as={ButtonGroup} className="delete-comment">
                              <Dropdown.Toggle className="no-arrow" style={{ backgroundColor: 'white', color: 'black', border: 'none' }}>
                                <i className="bi bi-three-dots"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>Edit <i className="bi bi-pencil"></i></Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDeleteComment(comment.id)}>Delete <i className="bi bi-trash3"></i></Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-actions">
                          <span className="comment-like" onClick={() => handleLikeComment(comment.id)}>
                            {comment.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                            <span style={{ marginLeft: "5px" }}>{comment.likes}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="add-comment">
                    <div className="add-comment-details">
                      <div className="add-comment-pfp"></div>
                      <div className="add-comment-username">{loggedInUser}</div> {/* Display logged-in username */}
                    </div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="add-comment-placeholder"
                    />
                    <button onClick={() => handleAddComment(post.id)} className="add-comment-post">Post</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ufeed;
