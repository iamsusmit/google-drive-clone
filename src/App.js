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

const LazyFileView = lazy(() => import("./components/filesView/FilesView"));

function App() {
  const [user, setUser] = useState();

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
  }, []);

  const handleLogin = () => {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          sessionStorage.setItem("user", JSON.stringify(result.user)); //use JSON.stringify for object datatype
          Cookies.set("userEmail", result.user.email); //since expiry is not set,it is a session cookie;hence n duplicate tab you have to re-login
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

  return (
    <div className="app">
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
        <div className="app__login">
          <img src={GDriveLogo} alt="Google Drive" />
          <button onClick={handleLogin}>Log in to Google Drive</button>
        </div>
      )}
    </div>
  );
}

export default App;
