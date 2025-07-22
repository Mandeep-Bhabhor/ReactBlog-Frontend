import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState("");
  const paramm = useParams();

  const fetchblog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/blog/" + paramm.id);
    const result = await res.json();
    setBlog(result.data);
  };

  useEffect(() => {
    fetchblog();
  }, []);
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between pt-4 mb-4">
        <h2>{blog.title}</h2>
        <a className="btn btn-dark" href="/">
          Back
        </a>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p>
            by <strong>{blog.author}</strong> {blog.date}
          </p>

          {blog.image && (
            <img
              className="w-50 "
              src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: blog.description }} className="mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
