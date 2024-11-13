export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://cba.payvantageapi.com/api/remitainflowapp";

export const API_BASE_URL_PROXY =
  process.env.NEXT_PUBLIC_API_PATH || "http://localhost:3000";

export const PORT = process.env.NEXT_PUBLIC_PORT || 3000;

export const API_PATH = process.env.NEXT_PUBLIC_API_PATH || "api";

export const sessionStorageName = "hm_dashboard";
