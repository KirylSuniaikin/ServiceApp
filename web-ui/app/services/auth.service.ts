import { signUp, confirmSignUp, signIn, fetchAuthSession, getCurrentUser, signOut, fetchUserAttributes } from "aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {EnumAsyncStorage, IUser, UserTypeEnum} from "@/types/types";

export const AuthService = {

	async logout() {
        await signOut();
		await AsyncStorage.removeItem(EnumAsyncStorage.USER)
        await AsyncStorage.removeItem("APP_INFO_CACHE")
	},

	async getUserFromStorage() {
        try {
            const userData = await AsyncStorage.getItem(EnumAsyncStorage.USER);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
             console.error("Failed load user from AsyncStorage:", error);
             return null;
        }
	},

     async getAccessToken() {
            try {
                const session = await fetchAuthSession();
                const accessToken = session.tokens?.accessToken?.toString();

                if (accessToken) {
                    console.log("`accessToken`:", accessToken);
                    return accessToken;
                }

                console.error("`accessToken` not found.");
                return null;
            } catch (error) {
                console.error("Error getting `accessToken`:", error);
                    console.warn("`refreshToken` expired. Log out user...");
                    await AuthService.logout();
                    return null;
            }
        },

    async register(data: any) {
            try {
                const { username, email, password, fullName } = data;
                await signUp({
                    username,
                    password,
                    options: {
                        userAttributes: {
                            email,
                            name: fullName,
                        },
                    },
                });
                console.log("Registration success.");
                return { success: true, username, email };
            } catch (error: any) {
                console.error("Registration Error:", error);
                Alert.alert("Registration Error", error.message || "Something went wrong");
                return { success: false, error };
            }
        },

     async confirmRegistration(username: string, code: string) {
            try {
                await confirmSignUp({ username, confirmationCode: code });
                console.log("Registration confirmation was successful.");
                return { success: true };
            } catch (error: any) {
                console.error("Confirmation Error:", error);
                Alert.alert("Confirmation Error", error.message || "Something went wrong");
                return { success: false, error };
            }
        },

     async login(data: any) {
            try {
                const { email, password } = data;
                const user = await signIn({ username: email, password });

                const userAttributes = await fetchUserAttributes();
                const { username, userId } = await getCurrentUser();
                const session = await fetchAuthSession();

                const currentUser = {
                    id: userId,
                    name: username,
                    type: UserTypeEnum.CUSTOMER,
                    email: userAttributes.email,
                    totalScore: 0,
                    revCount: 0,
                    balance: 0
                };

                await AsyncStorage.setItem(EnumAsyncStorage.USER, JSON.stringify(currentUser));
                return { success: true, user: currentUser };
            } catch (error: any) {
                console.error("Login Error:", error);
                Alert.alert("Login Error", error.message || "Invalid credentials");
                return { success: false, error };
            }
        }

}
