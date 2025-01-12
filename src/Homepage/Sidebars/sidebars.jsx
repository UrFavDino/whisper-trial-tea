// Sidebars.jsx
import React, { useState } from "react";
import { FaHome, FaSearch, FaPlus, FaRegHeart, FaRegUser, FaMapPin } from "react-icons/fa";
import PostModal from '../Modals/Post/PostModal';  // Ensure this path is correct
import SearchModal from '../Modals/Search/SearchModal'; // Import SearchModal
import '../Sidebars/sidebars.css'; // Ensure this path is correct

const Sidebars = ({ setShowLikedOnly, addPost, setSearchQuery }) => {
  const [showModal, setShowModal] = useState(false); // Modal visibility for post creation
  const [showSearchModal, setShowSearchModal] = useState(false); // Modal visibility for search
  const [searchQuery, setSearchQueryState] = useState(""); // Search query state
  const [visibility, setVisibility] = useState("Public");
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);

  const [showUserPosts, setShowUserPosts] = useState(false); // Toggle user-specific posts

  // Open the modal when FaPlus is clicked
  const openPostModal = () => setShowModal(true);

  // Close the modal
  const closePostModal = () => setShowModal(false);

  // Open the search modal
  const openSearchModal = () => setShowSearchModal(true);

  // Close the search modal
  const closeSearchModal = () => setShowSearchModal(false);

  // Handle search action
  const handleSearch = (query) => {
    setSearchQuery(query); // Pass the query to the parent component
    setSearchQueryState(query); // Update the local state for search query
  };

  // Mapping of sidebar buttons and their actions
  const sidebarButtons = [
    { icon: FaHome, action: () => { setShowLikedOnly(false); setShowUserPosts(false); } },
    { icon: FaSearch, action: openSearchModal }, // Open the search modal when clicked
    { icon: FaPlus, action: openPostModal },  // Open the post creation modal
    { icon: FaRegHeart, action: () => setShowLikedOnly((prev) => !prev) },
    { icon: FaRegUser, action: () => setShowUserPosts(true) },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo"></div>
      <div className="main-sidebar">
        {sidebarButtons.map(({ icon, action }, index) => (
          <button
            key={index}
            className="sidebar-button"
            onClick={action}
          >
            {React.createElement(icon, { size: 23 })}
          </button>
        ))}
      </div>
      <div className="sidebar-features">
        {[{ icon: FaMapPin }].map((item, index) => (
          <button key={index} className="sidebar-button">
            {React.createElement(item.icon, { size: 23 })}
          </button>
        ))}
      </div>

      {/* Conditionally render the PostModal */}
      {showModal && (
        <PostModal
          showModal={showModal}
          toggleModal={closePostModal}
          addPost={addPost}
          setVisibility={setVisibility}
          visibility={visibility}
          postContent={postContent}
          setPostContent={setPostContent}
          image={image}
          setImage={setImage}
        />
      )}

      {/* Conditionally render the SearchModal */}
      <SearchModal
        show={showSearchModal}
        onHide={closeSearchModal}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQueryState}
      />
    </div>
  );
};

export default Sidebars;