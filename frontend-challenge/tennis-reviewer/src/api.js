// src/api.js
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:4000";

const api = axios.create({ baseURL: API_URL });

export async function login(username, password) {
  const { data } = await api.post("/auth/login", { username, password });
  return data;
}

export async function getLocations() {
  const { data } = await api.get("/locations");
  return data;
}

export async function geocode(location) {
  const { data } = await api.get("/geocode", { params: { location } });
  return data; // { pincode }
}

export async function getCourts(pincode, q = "") {
  const { data } = await api.get("/courts", { params: { pincode, q } });
  return data;
}

export async function getCourt(id) {
  const { data } = await api.get(`/courts/${id}`);
  return data;
}

export async function getReviews(courtId) {
  const { data } = await api.get(`/courts/${courtId}/reviews`);
  return data;
}

export async function postReview(courtId, { rating, text }, token) {
  const { data } = await api.post(
    `/courts/${courtId}/reviews`,
    { rating, text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}
