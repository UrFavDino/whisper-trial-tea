import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Ensure react-bootstrap is installed
import "../Search/SearchModal.css";

const SearchModal = ({ show, onHide, onSearch, searchQuery, setSearchQuery }) => {
  const [passwordModalShow, setPasswordModalShow] = useState(false); // State for Password Modal
  const [password, setPassword] = useState(""); // State for password input

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSearchClick = () => {
    onSearch(searchQuery); // Pass the search query to the parent for filtering
    onHide(); // Close the modal after searching
  };

  const handleGroupClick = () => {
    setPasswordModalShow(true); // Show Password Modal
  };

  const handlePasswordSubmit = () => {
    // Logic to verify the password
    console.log("Password submitted:", password);
    setPasswordModalShow(false); // Close Password Modal
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered >
        <div className="search-modal">
          <Modal.Header closeButton style={{ fontSize: "15px" }}>
            <Modal.Title style={{ fontSize: "15px", marginLeft: "200px" }}>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by username"
              className="search-input"
              style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "20px" }}
            />
          </Modal.Body>
          <div className="Group" onClick={handleGroupClick}>
            <div className="group-about" >
              <div className="group-pfp"></div>
              <div>
                <div className="group-topic">
                  Topic <i className="bi bi-lock-fill"></i>
                </div>
                <div className="group-username">Dino</div>
              </div>
            </div>
            <div className="group-members">4 Members</div>
          </div>
        </div>
      </Modal>

      {/* Password Modal */}
      <Modal show={passwordModalShow} onHide={() => setPasswordModalShow(false)} centered dialogClassName="EnterPass">
      <div>
      <Modal.Header closeButton>
          <Modal.Title style={{fontSize: '13px'}}>Enter the Password to join</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "25px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Enter
          </Button>
        </Modal.Footer>
      </div>
      </Modal>
    </>
  );
};

export default SearchModal;
