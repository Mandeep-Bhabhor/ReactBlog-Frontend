import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
const Blogs = () => {
  const [blog, setBlogs] = useState("");

  const fetchblog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/showblog");
    const result = await res.json();
    setBlogs(result.data);
  };

  useEffect(() => {
    fetchblog();
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-4 mb-4 text-dark">
        <h2>Blogs</h2>
        <a className="btn btn-light align-items-center" href="/create">
          Create
        </a>
      </div>
      <div className="row">
        {blog &&
          blog.map((blog) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
      </div>
    </div>
  );
};

export default Blogs;
