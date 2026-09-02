// src/api/academics.js
import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

export const getAcademicPosts = () => apiGet("admin/academics");

/**
 * @param {{gradeLevel:string, title:string, description:string, attachment?:File}} data
 */
export function createAcademicPost(data) {
  const formData = new FormData();
  formData.append("gradeLevel", data.gradeLevel);
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.attachment) formData.append("attachment", data.attachment);
  return apiPost("/academics", formData, true);
}

export function updateAcademicPost(id, data) {
  const formData = new FormData();
  formData.append("gradeLevel", data.gradeLevel);
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.attachment) formData.append("attachment", data.attachment);
  return apiPatch(`/academics/${id}`, formData, true);
}

export const deleteAcademicPost = (id) => apiDelete(`/academics/${id}`);
