import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "@/navigation/Navigation";
import AuthProvider from "@/providers/auth/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {configureAmplify} from '@/cognito/cognito-config';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

configureAmplify();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SafeAreaProvider>
                    <Navigation/>
                </SafeAreaProvider>
            </AuthProvider>
            <StatusBar style="light"/>
        </QueryClientProvider>
    )
}

