import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState("");
  const [keyword, setKeyword] = useState("");

  const fetchblog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/showblog");
    const result = await res.json();
    setBlogs(result.data);
  };

  const searchBlogs = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "http://127.0.0.1:8000/api/showblog?keyword=" + keyword
    );
    const result = await res.json();
    setBlogs(result.data);
  };

  const resetSearch = () =>{
    fetchblog();
    setKeyword('');
  }
  useEffect(() => {
    fetchblog();
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5">
        <form onSubmit={(e) => searchBlogs(e)}>
          <div className="d-flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search Blogs"
            />
            <button className="Toastify__bounce-enter--bottom-center ms-2">
              Search
            </button>
            <button  type="button" onClick={() => resetSearch()} className="Toastify__bounce-enter--bottom-center ms-2">Reset</button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between pt-4 mb-4 text-dark">
        <h2>Blogs</h2>
        <a className="btn btn-light align-items-center" href="/create">
          Create
        </a>
      </div>
      <div className="row">
        {blogs &&
          blogs.map((blog) => {
            return (
              <BlogCard
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
                key={blog.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
