import axios from "axios";
import toast from "react-hot-toast";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL
});

// 🔹 Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Set Content-Type only if not FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Skip toast logic for blob responses (file downloads/exports)
    // Blob responses don't have JSON structure with IsSuccess/success properties
    const isBlobResponse = response?.config?.responseType === 'blob' || response?.data instanceof Blob;

    if (!isBlobResponse) {
      if (response?.data?.IsSuccess || response?.data?.isSuccess || response?.data?.success) {
        // toast.success(response?.data?.Message);
      } else {
        toast.error(response?.data?.Message || "Something went wrong!");
      }
    }
    return response;
  },
  (error) => {
    // if (error?.response?.status === 401) {
    //   localStorage.clear();
    //   window.location.href = "/";
    // }

    // Skip toast for blob responses (file download errors should be handled by component)
    const isBlobRequest = error?.config?.responseType === 'blob';

    if (!isBlobRequest) {
      const errorMessage = error?.response?.data?.Message || error?.response?.data?.message;
      if (errorMessage && typeof errorMessage === "string") {
        toast.error(errorMessage);
      }
      else {
        toast.error("Something went wrong!");
      }
    }

    console.error("Axios Error:", error);

    return Promise.reject(error);
  }
);

// 🔹 Auth APIs
export const login = (data) => api.post("admin/auth/login", data);
export const getProfile = () => api.get("admin/auth/profile");

// Image Upload 
export const uploadImage = (data) => api.post("admin/uploads/image", data);

// 🔹 Services APIs
export const saveService = (data) => api.post("admin/services/save", data);
export const deleteService = (data) => api.post("admin/services/delete", data);
export const listServices = () => api.get("admin/services/list");

// 🔹 Gallery APIs
export const saveGallery = (data) => api.post("admin/gallery/save", data);
export const deleteGallery = (data) => api.post("admin/gallery/delete", data);
export const listGallery = () => api.get("admin/gallery/list");

// 🔹 Testimonials APIs
export const saveTestimonial = (data) => api.post("admin/testimonials/save", data);
export const deleteTestimonial = (data) => api.post("admin/testimonials/delete", data);
export const listTestimonials = () => api.get("admin/testimonials/list");

// 🔹 Inquiries APIs
export const listInquiries = (data) => api.post("admin/inquiries/list", data);
export const updateInquiryStatus = (data) => api.post("admin/inquiries/update-status", data);
export const deleteInquiry = (data) => api.post("admin/inquiries/delete", data);

// 🔹 Site Configs APIs
export const saveSiteConfig = (data) => api.post("admin/siteconfigs/save", data);
export const getSiteConfig = () => api.get("admin/siteconfigs/get");

// 🔹 Taxi Routes APIs
export const saveTaxiRoute = (data) => api.post("admin/taxiroutes/save", data);
export const deleteTaxiRoute = (data) => api.post("admin/taxiroutes/delete", data);
export const listTaxiRoutes = () => api.get("admin/taxiroutes/list");

// 🔹 YouTube Videos APIs
export const saveYouTubeVideo = (data) => api.post("admin/youtubevideos/save", data);
export const deleteYouTubeVideo = (data) => api.post("admin/youtubevideos/delete", data);
export const listYouTubeVideos = () => api.get("admin/youtubevideos/list");