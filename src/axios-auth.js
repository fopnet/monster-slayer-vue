import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
});

export const FB_KEY = "?key=AIzaSyDMV1kmKZLi5V259QH8IQ1ZjA4Lp1fSALY";
