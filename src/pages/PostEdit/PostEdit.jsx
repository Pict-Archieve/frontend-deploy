import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { industries, postTypes } from "../../assets/data/post.data";
import Editor from "../../components/Editor/Editor";
import StarRating from "../../components/StarRating/StarRating";
import {
  editPost,
  getCompanyAndRoleList,
  getPost,
} from "../../services/post.services";
import getStringFromTags from "../../utils/getStringFromTags";
import styles from "./PostEdit.module.css";

export default function PostEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: 30 * 60 * 1000, // Stale time for 30min
  });

  // Invalidating the status and refetching the post data
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries(["post", id]);
  }, [queryClient, id]);

  // Fetching in Position and Companies
  const companyAndRoleQuery = useQuery({
    queryKey: ["company-role-list"],
    queryFn: () => getCompanyAndRoleList(),
  });

  // prettier-ignore
  const { mutate,isLoading } = useMutation({
    mutationFn: (postData) => editPost(postData, id, 'published'),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['post', id]);
      toast.success(data.message);
      navigate(`/post/${id}`);
    },
  });

  const initialValues = {
    title: postQuery.data?.title || "",
    role: postQuery.data?.role || "",
    company: postQuery.data?.company || "",
    domain: postQuery.data?.domain || "",
    postType: postQuery.data?.postType || "",
    content: postQuery.data?.content || "",
    summary: postQuery.data?.summary || "",
    tags: getStringFromTags(postQuery.data?.tags || []),
    rating: postQuery.data?.rating || 0,
  };

  return (
    <div className={styles.PostForm}>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string()
              .max(200, "Title must be less than 200 characters")
              .required("Title is required"),
            role: Yup.string().required("Role is required"),
            company: Yup.string().required("Company is required"),
            domain: Yup.string().required("Domain is required"),
            postType: Yup.string().required("Post Type is required"),
            tags: Yup.string().required("Tags is required"),
            rating: Yup.number().required("Rating is required"),
            summary: Yup.string().required("Summary is required"),
          })}
          onSubmit={(values) => mutate(values)}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className={styles.form}
              action=""
            >
              <header className={styles.title}>Write your post</header>

              <div
                className={`${styles.inputField} ${
                  formik.touched.title && formik.errors.title
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="title">
                  Title
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Interview Experience at XYZ company"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div className={styles.column}>
                <div
                  className={`${styles.inputField} ${
                    formik.touched.role && formik.errors.role
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="role">
                    Position Applied for
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="role"
                      list="roles"
                      placeholder="SDE 1 or Web development Intern"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <datalist id="roles">
                      {companyAndRoleQuery.data?.data.role.map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                    </datalist>
                  </label>
                </div>
                <div
                  className={`${styles.inputField} ${
                    formik.touched.company && formik.errors.company
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="company">
                    Company
                    <span className="required">*</span>
                    <input
                      type="text"
                      placeholder="Company"
                      name="company"
                      list="companies"
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <datalist id="companies">
                      {companyAndRoleQuery.data?.data.company.map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                    </datalist>
                  </label>
                </div>
              </div>

              <div className={styles.column}>
                <div
                  className={`${styles.inputField} ${
                    formik.touched.domain && formik.errors.domain
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="domain">
                    Industry
                    <span className="required">*</span>
                    <select
                      name="domain"
                      className={styles.inputField}
                      value={formik.values.domain}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Industry</option>
                      {industries.map((industry) => (
                        <option value={industry} key={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div
                  className={`${styles.inputField} ${
                    formik.touched.postType && formik.errors.postType
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="article">
                    Post Type
                    <span className="required">*</span>
                    <select
                      name="postType"
                      className={styles.inputField}
                      value={formik.values.postType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Post Type</option>
                      {postTypes.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className={`${styles.editor} ${styles.inputField}`}>
                <Editor name="content" />
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.tags && formik.errors.tags
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="tags">
                  Tags
                  <input
                    className={styles.tags}
                    type="text"
                    name="tags"
                    placeholder="#interview #experience #community"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.summary && formik.errors.summary
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="summary">
                  {formik.touched.summary && formik.errors.summary
                    ? formik.errors.summary
                    : "Summary"}
                  <span className="required">*</span>
                  <textarea
                    name="summary"
                    placeholder="Write Summary of your Post..."
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.rating && formik.errors.rating
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                Rate your Interview Experience
                <StarRating name="rating" />
              </div>

              <div className={styles.column}>
                <input
                  className={styles.registerButton}
                  type="submit"
                  value="Post"
                  disabled={isLoading}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
