import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlogs = () => {
  const [html, setHtml] = useState("");
  const [descError, setDescError] = useState("");
  const [imageId, setImageId] = useState("");
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

    const res = await fetch("http://127.0.0.1:8000/api/createblog", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();
    if (result.status) {
      toast.success("Blog Added Successfully");
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between pt-4 mb-4">
        <h2>Create Blogs</h2>
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
                {...register("title", { required: true, maxLength: 250 })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title?.type === "required" && (
                <p className="invalid-feedback">Title is required.</p>
              )}
              {errors.title?.type === "maxLength" && (
                <p className="invalid-feedback">
                  Maximum 250 characters allowed.
                </p>
              )}
            </div>

            {/* Short Desc */}
            <div className="mb-3">
              <label htmlFor="shortDesc" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc", { maxLength: 250 })}
                cols={20}
                rows={2}
                className={`form-control ${errors.shortDesc && "is-invalid"}`}
              ></textarea>
              {errors.shortDesc?.type === "maxLength" && (
                <p className="invalid-feedback">
                  Maximum 250 characters allowed.
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" onChange={handleFileChange} />
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
                {...register("author", { required: true, maxLength: 250 })}
                type="text"
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
              />
              {errors.author ? (
  errors.author.type === "maxLength" ? (
    <p className="invalid-feedback">
      Maximum 250 characters allowed.
    </p>
  ) : (
    <p className="invalid-feedback">Author is required.</p>
  )
) : null}
            </div>

            <button className="btn btn-dark" href="create">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
