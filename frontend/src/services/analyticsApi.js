import api from "./api";

export const getSummary = () => api.get("/analytics/summary").then((res) => res.data);
export const getByCategory = () => api.get("/analytics/by-category").then((res) => res.data.data);
export const getMonthly = () => api.get("/analytics/monthly").then((res) => res.data.data);
export const getTrend = () => api.get("/analytics/trend").then((res) => res.data.data);