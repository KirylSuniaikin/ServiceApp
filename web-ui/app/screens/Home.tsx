import React, { useEffect, useState } from "react";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import HomeHeader from "@/components/headers/HomeHeader";
import { AppInfoService } from "@/services/appInfo.service";
import {IService, ISubService} from "@/types/types";
import ServiceList from "@/components/ServiceList";

const Home: React.FC = () => {
    const [services, setServices] = useState<IService[]>([]);
    const [subServices, setSubServices] = useState<ISubService[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadServices = async () => {
            setLoading(true);
            try {
                const data = await AppInfoService.getAppInfo();
                if (data?.services && data?.subServices) {
                    setServices(data.services);
                    setSubServices(data.subServices);
                } else {
                    setError("There is no data on services.");
                }
            } catch (err) {
                console.error("Data loading error:", err);
                setError("Data loading error.");
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    return (
        <View style={styles.container}>
            <HomeHeader />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ServiceList services={services} subServices={subServices} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 16,
    },
});

export default Home;