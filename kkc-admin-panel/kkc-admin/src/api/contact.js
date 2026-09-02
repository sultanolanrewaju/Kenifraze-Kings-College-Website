// src/api/contact.js
import { apiGet, apiPatch } from "./client";

export const getContactInfo = () => apiGet("/settings/contact");

/**
 * @param {{address:string, email:string, phones:string[], socials:{platform:string,url:string}[]}} data
 */
export const updateContactInfo = (data) => apiPatch("/settings/contact", data);
