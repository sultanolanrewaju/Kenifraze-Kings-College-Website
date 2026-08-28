import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/contact";

const useContact = create((set, get) => ({
  // 1. DATA (state variables)
  contacts: [],
  loading: false,
  error: null,
  successMessage: null,

  // 2. ACTIONS

  // Fetch the existing contact info from backend
  fetchContact: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      // Handles both array or single object responses safely
      const data = Array.isArray(response.data) ? response.data : [response.data];
      set({ contacts: data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch contact details",
        loading: false,
      });
    }
  },

  // Update existing contact record using PATCH
  updateContact: async (contactId, updatedData) => {
    try {
      set({ loading: true, error: null, successMessage: null });

      // Send PATCH request with the specific contact ID in the URL
      const response = await axios.patch(`${API_URL}/${contactId}`, updatedData);

      const updatedContact = response.data.contact || response.data;

      // Update state by replacing the matching contact in the array
      set((state) => ({
        contacts: state.contacts.map((c) =>
          c._id === contactId || c.id === contactId ? updatedContact : c
        ),
        loading: false,
        successMessage: "Contact info updated successfully!",
      }));

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update contact info",
        loading: false,
      });
      return false;
    }
  },
}));

export default useContact;