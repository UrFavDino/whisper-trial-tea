import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../SetPassword/SetPasswordModal.css";

const SetPasswordModal = ({ show, onClose, password, setPassword }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Validate password match
  const handleSave = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); // Clear error if passwords match
    onClose(); // Close the modal
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Real-time validation
    if (password && e.target.value !== password) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  return (
    <div
      className="set-password-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 1050,
      }}
    >
      <Modal.Dialog>
        <div className="set-pass-main">
          <Modal.Header style={{ justifyContent: "space-between" }}>
            <Modal.Title
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "80px",
                marginTop: '10px'
              }}
            >
              Set a Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="password"
              className="set-password-input"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "8px",
                marginTop: "20px",
                fontSize: "13px",
              }}
            />
            <input
              type="password"
              className="set-password-input"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{
                padding: "8px",
                fontSize: "13px",
                marginBottom: '10px'
              }}
            />
            {error && (
              <div
                className="set-password-error"
                style={{ color: "red", fontSize: "12px", marginBottom: "20px", marginLeft: "10px" }}
              >
                {error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="set-password-save"
              onClick={handleSave}
              disabled={!password.trim() || !confirmPassword.trim()}
              style={{
                backgroundColor: error ? "gray" : "black",
                border: "none",
                marginRight: "10px",
                width: "100%",
                marginLeft: "10px",
                marginBottom: '10px'
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Dialog>
    </div>
  );
};

export default SetPasswordModal;
