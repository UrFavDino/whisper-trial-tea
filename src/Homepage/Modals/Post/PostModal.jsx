import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import SetPasswordModal from "../Post/SetPassword/SetPasswordModal";
import '../../Sidebars/sidebars.css';

const PostModal = ({
  showModal,
  toggleModal,
  addPost,
  setVisibility,
  visibility,
  postContent,
  setPostContent,
  image,
  setImage,
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedTag, setSelectedTag] = useState(""); // State to store selected tag
  const [showTagModal, setShowTagModal] = useState(false); // State to control tag modal

  // Get the logged-in username from localStorage
  const loggedInUser = localStorage.getItem("username");

  // Handle the post creation
  const handlePost = () => {
    if (!postContent.trim() && !image) {
      alert("Please add some content or an image.");
      return;
    }

    const newPost = {
      id: Date.now(),
      username: loggedInUser || "Anonymous", // Use logged-in username, default to "Anonymous" if not available
      time: "Just now",
      content: postContent,
      image,
      liked: false,
      likes: 0,
      comments: [],
      visibility: visibility === "Private" ? "Private" : "Public",
      password: visibility === "Private" ? password : "",
      tag: selectedTag, // Add selected tag to the post
    };

    addPost(newPost); // Adding the post
    setPostContent("");
    setImage(null);
    setPassword(""); // Reset password field
    setVisibility("Public"); // Reset visibility to "Public"
    setSelectedTag(""); // Reset selected tag
    toggleModal(); // Close the modal
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Open password modal
  const handlePrivateSelection = () => {
    setVisibility("Private");
    setShowPasswordModal(true); // Show password modal when "Private" is selected
  };

  // Handle typing a topic (tag)
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value); // Update the selected tag as the user types
  };

  return (
    <>
      <div
        className="modals-add-show"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1050,
          color: "black",
        }}
      >
        <Modal.Dialog className="add-modal-bg">
          <Button
            variant="secondary"
            onClick={toggleModal}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              width: "40px",
              marginLeft: "400px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            <i className="bi bi-x-lg"></i> {/* Close icon */}
          </Button>

          <Modal.Body>
            <div>
              <div className="modal-post">
                <div className="modal-post-pfp"></div>
                <div className="modal-post-username">{loggedInUser || "Anonymous"}</div>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle className="public-private" id="dropdown-basic">
                    <i className="bi bi-people-fill" style={{ marginRight: "3px" }}></i>
                    {visibility}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setVisibility("Public")}>
                      <i className="bi bi-people-fill" style={{ marginRight: "3px" }}></i> Public
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handlePrivateSelection}>
                      <i className="bi bi-person-fill-lock"></i> Private
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="modal-post-input">
                <textarea
                  className="txt-area"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  style={{
                    width: "95%",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="modal-image-preview">
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                      marginLeft: "20px",
                    }}
                  />
                )}
              </div>
              {visibility === "Private" && (
                <div className="modal-tag-input">
                  <input
                    type="text"
                    placeholder="Enter topic"
                    value={selectedTag}
                    onChange={handleTagChange}
                    style={{
                      width: "92%",
                      padding: "10px",
                      marginTop: "10px",
                      marginLeft: '18px',
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="modal-post-actions">
              <div className="hover">
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <i className="bi bi-card-image"></i>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
              <div className="hover">
                <i className="bi bi-emoji-grin"></i>
              </div>
              <Button className="post-add-feed" onClick={handlePost}>
                Post
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>

      {/* Password Modal */}
      <SetPasswordModal
        show={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
};

export default PostModal;  