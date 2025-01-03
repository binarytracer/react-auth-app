import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const now = new Date();
  return storedExpirationDate.getTime() - now.getTime();
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getTokenDuration();

  // token expired
  if (duration <= 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  console.log("token loader");
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
