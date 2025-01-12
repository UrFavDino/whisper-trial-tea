import Navs from "../Navs/Navs";
import Sbars from "../Sidebars/sidebars";
import Ufeed from "../Feed/ufeed";
import React, { useState, useEffect } from "react";
import P1 from '../../../public/post1.jpg';
import P2 from '../../../public/pfpss.jpg';
import P3 from '../../../public/post3.jpg';
import "../Homes/Home.css"; // Import the CSS file

const Home = () => {
  // Function to retrieve the logged-in username from localStorage
  const getLoggedInUser = () => {
    const username = localStorage.getItem("loggedInUsername");
    console.log("Logged-in user: ", username);  // Log the username to verify
    return username;
  };
  

  const initialPosts = [
    {
      id: 1,
      username: "camille_sexy05",
      time: "1h",
      content: "New year, new me!",
      image: P1,
      liked: false,
      likes: 0,
      comments: [],
      visibility: "Public", // Added visibility
    },
    {
      id: 2,
      username: "jethr0_lng_masikip",
      time: "6h",
      content: "azko lngz itesh",
      image: P2,
      liked: false,
      likes: 0,
      comments: [],
      visibility: "Public", // Added visibility
    },
    {
      id: 3,
      username: "grishamagpamahal04",
      time: "Just now",
      content: "Boreds lng me hayss give me chismis",
      liked: false,
      likes: 0,
      comments: [],
      visibility: "Private", // Example of a private post
    },
    {
      id: 4,
      username: "ririlng2",
      time: "Just now",
      content: "CBTL at the moment!",
      image: P3,
      liked: false,
      likes: 0,
      comments: [],
      visibility: "Public", // Added visibility
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");
  
  // Fetch the logged-in username from localStorage
  const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser());

  // Function to shuffle the array
  const shufflePosts = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  // Shuffle posts on component mount
  useEffect(() => {
    const shuffledPosts = shufflePosts(initialPosts);
    setPosts(shuffledPosts);
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="home-container">
      <Navs setSelectedPage={setSelectedPage} />
      <div className="content">
        <Sbars setShowLikedOnly={setShowLikedOnly} addPost={addPost} setSelectedPage={setSelectedPage} />
        <div className="UFEED-container">
          <Ufeed 
            showLikedOnly={showLikedOnly} 
            posts={posts} 
            setPosts={setPosts} 
            selectedPage={selectedPage}
            loggedInUser={loggedInUser} // Pass the actual logged-in user's username as a prop
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
