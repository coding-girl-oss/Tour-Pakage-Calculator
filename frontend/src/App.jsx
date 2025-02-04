import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Agent from "./pages/Agent";
import Login from './pages/Login'
import Service from "./pages/Service";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <div className="min-h-screen flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/service" element={<Service />} />
            </Route>
          </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
