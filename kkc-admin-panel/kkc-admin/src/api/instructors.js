// src/api/instructors.js
import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

export const getInstructors = () => apiGet("admin/instructors");

/**
 * @param {{name:string, role:string, bio:string, image?:File}} data
 */
export function createInstructor(data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("subject", data.role);
  formData.append("bio", data.bio);
  // formData.append("email", data.email);
  if (data.image) formData.append("ImageUrl", data.image);
  return apiPost("admin/instructors", formData, true);
}

export function updateInstructor(id, data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("role", data.role);
  formData.append("bio", data.bio);
  formData.append("email", data.email);
  if (data.image) formData.append("image", data.image);
  return apiPatch(`/instructors/${id}`, formData, true);
}

export const deleteInstructor = (id) => apiDelete(`/instructors/${id}`);
