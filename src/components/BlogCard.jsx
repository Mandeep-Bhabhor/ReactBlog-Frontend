import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogCard = ({ blog , blogs, setBlogs }) => {
  const params = useParams();
  const showImage = (img) => {
    return img
      ? "http://127.0.0.1:8000/uploads/blogs/" + img
      : "https://placehold.co/600x400";
  };
  const deleteBlog = (id) => {
    if (confirm("Are you sure you want to d?")) {
      const res = fetch("http://127.0.0.1:8000/api/blog/" + id, {
        method: 'DELETE',
      });

      const newBlogs = blogs.filter((blog) => blog.id != id);
      setBlogs(newBlogs);

      toast("blog deleted successfully");
    }
  };
  return (
    <div className="col-12 col-md-2 col-lg-3 mb-4">
      <div className="card border-0 shadow-lg">
        <img src={showImage(blog.image)} className="card card-img-top" />
        <div className="card-body">
          <h5>{blog.title}</h5>
          <p>{blog.shortDesc}</p>
          <div className="d-flex justify-content-between">
            <a href={`/blog/${blog.id}`} className="btn btn-dark">
              Details
            </a>
            <div>
              <a href={`/blog/edit/${blog.id}`} className="text-dark me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
              </a>
              <a
                href="#"
                className="text-danger"
                onClick={() => deleteBlog(blog.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
