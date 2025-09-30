import axios from "axios";
const goUrl = process.env.GO_API || "http://localhost:8090";
const springUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1/";
export const axiosSpring = axios.create({
  baseURL: springUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosGo = axios.create({
  baseURL: goUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
