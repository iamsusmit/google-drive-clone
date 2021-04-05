import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  PaneDirective,
  PanesDirective,
  SplitterComponent,
} from "@syncfusion/ej2-react-layouts";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-layouts/styles/material.css";
import { Skeleton } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
// import FilesView from "./components/filesView/FilesView";
import SideIcons from "./components/sideIcons";
import GDriveLogo from "./media/google-drive-logo.png";
import { auth, provider } from "./firebase";
import Cookies from "js-cookie";
import Particles from "react-particles-js";

const LazyFileView = lazy(() => import("./components/filesView/FilesView"));

function App() {
  const [user, setUser] = useState();
  const [currentHour, setCurrentHour] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    //it tells us whether page has been refreshed or not
    if (window.performance) {
      if (performance.navigation.type === 1) {
        var cookies = Cookies.get("userEmail");
        if (cookies != undefined) {
          setUser(JSON.parse(sessionStorage.getItem("user"))); //use JSON.parse for object datatype
        }
      }
    }
    setCurrentHour(new Date().getHours());
  }, []);

  useEffect(() => {
    //if user is logged in then display user name in tab
    if (user) {
      document.title = user?.displayName + " - Google Drive";
    }
  }, [user]);

  const handleLogin = () => {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          sessionStorage.setItem("user", JSON.stringify(result.user)); //use JSON.stringify for object datatype
          Cookies.set("userEmail", result.user.email); //since expiry is not set,it is a session cookie;hence in duplicate tab you have to re-login

          let lastLoginTime = localStorage.getItem("loginTime"); //accessing last login time

          //Greeting based on the time & last login.
          alert(
            "Good " +
              ((currentHour < 12 && "Morning") ||
                (currentHour < 18 && "Afternoon") ||
                "Evening") +
              "," +
              result.user?.displayName +
              (lastLoginTime != null
                ? ".\nYou last logged in " + lastLoginTime
                : ".\nThis is your first time visit") +
              ".\nWelcome to your G-Drive."
          );
          localStorage.setItem("loginTime", new Date()); //setting last login time
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const sidebarPane = () => {
    return (
      <div className="app__main">
        <Sidebar />
      </div>
    );
  };

  const fileViewPane = () => {
    return (
      <div className="app__main">
        <Suspense fallback={<Skeleton active />}>
          <LazyFileView />
        </Suspense>
      </div>
    );
  };

  //on every click,bg-color gets changed
  const handleClick = () => {
    let colorPalette = [
        "rgba(234, 250, 211,0.671)",
        "rgba(239, 248, 198,0.671)",
        "rgba(173, 145, 114, 0.671)",
        "rgba(133, 184, 174, 0.671)",
        "rgba(89, 132, 168, 0.671)",
        "rgba(203, 152, 223, 0.671)",
        "rgba(235, 173, 173, 0.671)",
        "rgba(134, 204, 158, 0.671)",
        "rgba(144, 135, 226, 0.671)",
        "rgba(187, 112, 181, 0.671)",
      ],
      index = Math.floor(Math.random() * 10); // returns a random integer from 0 to 9
    setColor(colorPalette[index]);
  };

  return (
    <div
      className="app"
      onClick={() => handleClick()}
      style={{ backgroundColor: color }}
    >
      {user ? (
        <>
          <Header userPhoto={user?.photoURL} />
          <div className="app__main">
            <SplitterComponent id="separator" separatorSize={5}>
              <PanesDirective>
                <PaneDirective
                  content={sidebarPane}
                  min="10%"
                  max="20%"
                  size="15%"
                />
                <PaneDirective content={fileViewPane} min="80%" max="90%" />
              </PanesDirective>
            </SplitterComponent>

            <SideIcons />
          </div>
        </>
      ) : (
        <>
          <div className="app__login">
            <img src={GDriveLogo} alt="Google Drive" />
            <button onClick={handleLogin}>Log in to Google Drive</button>
          </div>
          {/* Animation */}
          <Particles
            params={{
              particles: {
                number: {
                  value: 80,
                },
                size: {
                  value: 4,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse",
                  },
                },
              },
            }}
            className="particles"
          />
        </>
      )}
    </div>
  );
}

export default App;
