import {request} from "@/api/request.api";
import {IAppInfo} from "@/types/types";
import {API_URL, SERVER_REQUEST} from "@/api/url.api";
import {useAuth} from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "@/api/interceptors.api";

const CACHE_KEY = "APP_INFO_CACHE";
const CACHE_EXPIRATION = 60 * 60 * 1000 * 24;

export const AppInfoService = {
    async getAppInfo(forceUpdate = false): Promise<IAppInfo | null> {
        try {
            if (!forceUpdate) {
                const cachedData = await AsyncStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const isExpired = Date.now() - parsedData.timestamp > CACHE_EXPIRATION;

                    if (isExpired) {
                        console.log("Cached data has been loaded::", parsedData.data);
                        return parsedData.data;
                    }
                }
            }

            console.log("Request `IAppInfo` from server");
            const data = await request<IAppInfo>({
                url: SERVER_REQUEST.getApplicationInfo.url,
                method: SERVER_REQUEST.getApplicationInfo.method
            });

            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
            console.log("`IAppInfo` обновлен и сохранен в кэш:", data);

            return data;
        } catch (error) {
            console.error("Error getting `IAppInfo`:", error);
            return null;
        }
    },

    async clearAppInfoCache() {
        await AsyncStorage.removeItem(CACHE_KEY);
        console.log("Кэш `IAppInfo` очищен.");
    }
};