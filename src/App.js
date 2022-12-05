import React, { Suspense, useContext} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoadingSpnner from "./components/UI/LoadingSpinner";
// import Footer from "./components/Layouts/Footer";
// import AddTodoPage from "./pages/AddTodoPage";
// import AuthPage from "./pages/AuthPage";
// import EditPage from "./pages/EditPage";
// import HomePage from "./pages/HomePage";
// import SettingsPage from "./pages/SettingsPage";
import TodoConext from "./store/todo-context";

// const OtherComponent = React.lazy(() => import('./OtherComponent'));

const Footer = React.lazy(() => import("./components/Layouts/Footer"));
const AddTodoPage = React.lazy(() => import("./pages/AddTodoPage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const EditPage = React.lazy(() => import("./pages/EditPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));



function App() {
  const todoCtx = useContext(TodoConext)

  return (
    <>
      <main className="max-w-screen-md mx-auto bg-secondaryLightTheme dark:bg-darkTheme h-screen">
        <Suspense fallback={<LoadingSpnner />}>
          <Routes>
            {!todoCtx.isLoggedIn && (
              <Route path="auth" element={<AuthPage />} />
            )}
            {!todoCtx.isLoggedIn && (
              <Route path="/" element={<Navigate to="/auth" />} />
            )}
            {todoCtx.isLoggedIn && (
              <Route path="/index" element={<HomePage />} />
            )}
            {todoCtx.isLoggedIn && (
              <Route path="/index/add" element={<AddTodoPage />} />
            )}
            {todoCtx.isLoggedIn && (
              <Route path="/index/edit/:id" element={<EditPage />} />
            )}
            {todoCtx.isLoggedIn && (
              <Route path="/index/settings" element={<SettingsPage />} />
            )}
            {todoCtx.isLoggedIn && (
              <Route path="/" element={<Navigate to="/index" />} />
            )}
          </Routes>
        </Suspense>
      </main>
      {todoCtx.isLoggedIn && <Footer />}
    </>
  );
}

export default App;