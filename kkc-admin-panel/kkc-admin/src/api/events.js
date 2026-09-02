// src/api/events.js
import { apiGet, apiPost, apiPatch, apiDelete } from "./client";

export const getEvents = () => apiGet("admin/events");

/**
 * @param {{title:string, date:string, location:string, description:string, image?:File}} data
 */
export function createEvent(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("date", data.date);
  formData.append("location", data.location);
  formData.append("description", data.description);
  if (data.image) formData.append("ImageUrl", data.image);
  return apiPost("admin/events", formData, true);
}

export function updateEvent(id, data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("date", data.date);
  formData.append("location", data.location);
  formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  return apiPatch(`/events/${id}`, formData, true);
}

export const deleteEvent = (id) => apiDelete(`admin/events/${id}`);

