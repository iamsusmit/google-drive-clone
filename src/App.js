import React, { lazy, Suspense, useState } from "react";
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

const LazyFileView = lazy(() => import("./components/filesView/FilesView"));

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
