import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IService, ISubService } from "@/types/types";
import {TypeRootStackParamList} from "@/navigation/navigation.types";

interface IProps {
    services: IService[];
    subServices: ISubService[];
}

const ServiceList: React.FC<IProps> = ({ services, subServices }) => {
    const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
    const {navigate} = useNavigation<TypeRootStackParamList>();
    const toggleExpand = (serviceId: number) => {
        setExpandedServiceId(expandedServiceId === serviceId ? null : serviceId);
    };

    return (
        <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: service }) => {
                const relatedSubServices = subServices.filter(
                    (sub) => sub.serviceType === service.id
                );

                return (
                    <View style={styles.serviceContainer}>
                        <TouchableOpacity
                            style={styles.serviceHeader}
                            onPress={() => toggleExpand(service.id)}
                        >
                            <Text style={styles.serviceName}>{service.name}</Text>
                            <Feather
                                name={expandedServiceId === service.id ? "chevron-up" : "chevron-down"}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>

                        {expandedServiceId === service.id && (
                            <View style={styles.subServiceContainer}>
                                {relatedSubServices.map((sub) => (
                                    <TouchableOpacity
                                        key={sub.id}
                                        style={styles.subServiceButton}
                                        onPress={() => navigate("CreateTicket", { subServiceId: sub.id })}
                                    >
                                        <Text style={styles.subServiceText}>{sub.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    serviceContainer: {
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    serviceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FAFAFA",
    },
    serviceName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subServiceContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    subServiceButton: {
        paddingVertical: 8,
    },
    subServiceText: {
        fontSize: 16,
        color: "#007AFF",
    },
});

export default ServiceList;