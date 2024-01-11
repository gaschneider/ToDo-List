import axios from "axios";
import { BASE_URL } from "./endpoints";

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});
