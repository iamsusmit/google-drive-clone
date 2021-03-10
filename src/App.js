import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import FilesView from "./components/filesView/FilesView";
import SideIcons from "./components/sideIcons";

import GDriveLogo from "./media/google-drive-logo.png";

import { auth, provider } from "./firebase";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();

  const handleLogin = () => {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="app">
      {user ? (
        <>
          <Header userPhoto={user.photoURL} />
          <div className="app__main">
            <Sidebar />
            <FilesView />
            <SideIcons />
          </div>
        </>
      ) : (
        <div className="app__login">
          <img src={GDriveLogo} alt="Google Drive" />
          <button onClick={handleLogin}>Log in to Google Drive</button>
        </div>
      )}
    </div>
  );
}

export default App;
