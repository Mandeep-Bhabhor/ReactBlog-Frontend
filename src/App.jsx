import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "./components/BlogCard";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlogs from "./components/CreateBlogs";
import { ToastContainer, toast } from "react-toastify";
import SingleBlog from "./components/SingleBlog";
import "./App.css";
import logo from "./assets/react.svg";
import EditBlog from "./components/EditBlog";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="React Logo" className="logo" />
        </div>
        <div className="bg-dark text-center py-2">
          <h1 className="text-white">React Blogs Website</h1>
        </div>

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/create" element={<CreateBlogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
