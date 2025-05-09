import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useAuth } from "@/hooks/useAuth";
import {ITicket} from "@/types/types";

const CardPrint: React.FC<ITicket> = ({ ...ticket }) => {
    const { user } = useAuth();

    return (
        <Card style={styles.card}>
            <View style={styles.content}>
                <View style={styles.imagePlaceholder} />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Sub Task: {ticket.subType}</Text>
                    <Text style={styles.description}>{ticket.description}</Text>
                    <Text style={styles.budget}>Budget: ${ticket.budget}</Text>
                </View>
            </View>

            <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonText}
                onPress={() => console.log("Order Now")}
            >
                Order now
            </Button>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FAFAFA",
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Для Android
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: "#D3D3D3",
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#555",
    },
    budget: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4CAF50",
    },
    button: {
        backgroundColor: "black",
        borderRadius: 8,
        paddingVertical: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
    },
});

export default CardPrint;