import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [html, setHtml] = useState("");
  const [descError, setDescError] = useState("");
  const [imageId, setImageId] = useState("");
  const [blog, setBlogs] = useState("");
  const navigate = useNavigate();
  const paramm = useParams();
  // 🔧 Fix: onChange must use correct plain text logic
  function onChange(e) {
    const value = e.target?.value || e; // depends on Editor's implementation
    setHtml(value);

    const htmlString = typeof value === "string" ? value : value?.html || "";
    const plainText = htmlString.replace(/<[^>]*>/g, "").trim();

    if (plainText.length > 5000) {
      setDescError("Description must be less than 5000 characters.");
    } else {
      setDescError("");
    }
  }

  // ----- Image Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://127.0.0.1:8000/api/save-img", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!result.status) {
      alert(result.errors?.image || "Image upload failed");
      e.target.value = null;
      return;
    }

    setImageId(result.img.id);
  };

  const fetchblog = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/blog/" + paramm.id);
    const result = await res.json();
    setBlogs(result.data);
    setHtml(result.data.description);

    reset(result.data);
  };

  // ----- Submit Form
  const formSubmit = async (data) => {
    if (descError) {
      toast.error("Fix description errors first.");
      return;
    }

    const newData = {
      ...data,
      description: html,
      image_id: imageId,
    };

    const res = await fetch("http://127.0.0.1:8000/api/blog/"+paramm.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();
    if (result.status) {
      toast.success("Blog Updated Successfully");
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchblog();
  },  []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between pt-4 mb-4">
        <h2>Edit Blogs</h2>
        <a className="btn btn-dark" href="/">
          Back
        </a>
      </div>

      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", { required: true, maxLength: 300 })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title?.type === "required" && (
                <p className="invalid-feedback">Title is required.</p>
              )}
              {errors.title?.type === "maxLength" && (
                <p className="invalid-feedback">
                  Maximum 300 characters allowed.
                </p>
              )}
            </div>

            {/* Short Desc */}
            <div className="mb-3">
              <label htmlFor="shortDesc" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc", { maxLength: 1000 })}
                cols={20}
                rows={2}
                className={`form-control ${errors.shortDesc && "is-invalid"}`}
              ></textarea>
              {errors.shortDesc?.type === "maxLength" && (
                <p className="invalid-feedback">
                  Maximum 1000 characters allowed.
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" onChange={handleFileChange} />
              <div className="mt-3">
                {blog.image && (
                  <img
                    className="w-50 "
                    src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`}
                  />
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="Desc" className="form-label">
                Description
              </label>
              <Editor
                value={html}
                containerProps={{ style: { height: "800px" } }}
                onChange={onChange}
              />
              {descError && (
                <p className="invalid-feedback d-block">{descError}</p>
              )}
            </div>

            {/* Author */}
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                {...register("author", { required: true })}
                type="text"
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
              />
              {errors.author && (
                <p className="invalid-feedback">Author is required.</p>
              )}
            </div>

            <button className="btn btn-dark" href="create">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
