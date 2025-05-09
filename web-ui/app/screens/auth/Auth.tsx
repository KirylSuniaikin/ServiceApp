import React, {FC, useState} from "react";
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/auth.service";
import AuthFields from "@/screens/auth/AuthFields";
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import {UserService} from "@/services/user.service";
import Toast from "react-native-toast-message";


const Auth: FC = () => {
    const [isReg, setIsReg] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const {navigate} = useNavigation<TypeRootStackParamList>();
    const { handleSubmit, control } = useForm({ mode: "onChange" });

    const onRegister = async (data: any) => {
        setLoading(true);
        const result = await AuthService.register(data);
        setLoading(false);

        if (result.success) {
            setEmail(result.email);
            setUsername(result.username);
            setIsConfirming(true);
            Alert.alert("Check your email", "Enter the confirmation code sent to your email.");
        }
    };

    const onConfirm = async (data: any) => {
        setLoading(true);
        const result = await AuthService.confirmRegistration(username, data.code);
        const userTO = {

        };
        setLoading(false);

        if (result.success) {
            onLogin({ email, password: data.password });
        }
    };

    const onLogin = async (data: any) => {
        setLoading(true);
        const result = await AuthService.login(data);
        const userTO = {
            id: result.user?.id,
            email: result.user?.email,
            name: result.user?.name,
            role: result.user?.type,
            totalScore: 0,
            revCount: 0
        };
        try {
            console.log("Sending userTO", userTO);
            const userCreateResult = await UserService.createUser(userTO);
            console.log("User created successfully:", userCreateResult);
        } catch (error) {
            console.error("Error creating user:", error);
        }
        setLoading(false);

        if (result.success) {
            setUser(result.user);
            navigate("Home");
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.innerContainer}>
                    <Text style={styles.headerText}>{isConfirming ? "Confirm Email" : isReg ? "Sign Up" : "Login"}</Text>

                    <AuthFields control={control} isReg={isReg} isConfirming={isConfirming} />

                    <Button mode="contained" loading={loading} onPress={handleSubmit(isConfirming ? onConfirm : isReg ? onRegister : onLogin)} style={styles.button}>
                        {isConfirming ? "Confirm" : isReg ? "Sign Up" : "Login"}
                    </Button>

                    {!isConfirming && (
                        <View style={styles.footer}>
                            <Text>{isReg ? "Already have an account? " : "Don't have an account? "}</Text>
                            <TouchableOpacity onPress={() => { setIsReg(!isReg); setIsConfirming(false); }}>
                                <Text style={styles.link}>{isReg ? "Login" : "Sign up"}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 },
    innerContainer: { width: "90%", maxWidth: 400 },
    headerText: { textAlign: "center", fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#000" },
    button: { marginTop: 16, paddingVertical: 8 },
    footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 12 },
    link: { color: "#4caf50", fontWeight: "bold" },
});

export default Auth;