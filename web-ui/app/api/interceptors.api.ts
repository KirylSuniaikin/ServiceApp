import axios from "axios";
import { AuthService } from "@/services/auth.service";
import { API_URL } from "@/api/url.api";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const accessToken = await AuthService.getAccessToken();

        if (!accessToken) {
            console.warn("Token not received, cancel request.");
            return Promise.reject(new Error("User not authorised"));
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log("`accessToken` added to the request headers");
    } catch (error) {
        console.error("Error when adding `accessToken`:", error);
        return Promise.reject(error);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
