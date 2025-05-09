import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import Layout from "@/components/Layout";
import { loadMyTicketInfo } from "@/store/actions/ticketActions";
import {ITicket, UserTypeEnum} from "@/types/types";
import CardPrint from "@/components/TicketCard";

const MyTickets: React.FC = () => {

    useEffect(() => {
        // dispatch(loadMyTicketInfo());
        console.log("Dispatched");
    }, []);

    const dummyAuthor = {
        id: "1",
        name: "John Doe",
        type: UserTypeEnum.CUSTOMER,
        email: "john.doe@example.com",
        totalScore: 50,
        revCount: 10,
        balance: 200,
        expireDate: "2025-12-31",
        password: "hashedpassword",
    };

    const dummyTasker = {
        id: "2",
        name: "Alice Smith",
        type: UserTypeEnum.TASKER,
        email: "alice.smith@example.com",
        totalScore: 75,
        revCount: 20,
        balance: 500,
        expireDate: "2025-12-31",
        password: "hashedpassword",
    };

    const dummyTickets: ITicket[] = [
        {
            id: "101",
            subType: "Plumbing Repair",
            description: "Fix a leaking kitchen faucet.",
            budget: 80,
            location: "New York, NY",
            creationDate: "2024-02-01",
            finishDate: "2024-02-10",
            author: dummyAuthor,
            tasker: dummyTasker,
            ticketStatus: "OPEN",
        },
        {
            id: "102",
            subType: "Electrical Wiring",
            description: "Rewire the living room ceiling lights.",
            budget: 150,
            location: "New York, NY",
            creationDate: "2024-02-02",
            finishDate: "2024-02-15",
            author: dummyAuthor,
            tasker: dummyTasker,
            ticketStatus: "IN_PROGRESS",
        },
        {
            id: "103",
            subType: "Furniture Assembly",
            description: "Assemble IKEA wardrobe and bookshelves.",
            budget: 50,
            location: "Brooklyn, NY",
            creationDate: "2024-02-03",
            finishDate: "2024-02-12",
            author: dummyAuthor,
            tasker: dummyTasker,
            ticketStatus: "OPEN",
        },
        {
            id: "104",
            subType: "Painting Job",
            description: "Paint the bedroom walls white.",
            budget: 200,
            location: "Manhattan, NY",
            creationDate: "2024-02-04",
            finishDate: "2024-02-18",
            author: dummyAuthor,
            tasker: dummyTasker,
            ticketStatus: "IN_PROGRESS",
        },
        {
            id: "105",
            subType: "PC Repair",
            description: "Fix overheating issue on my gaming laptop.",
            budget: 120,
            location: "Queens, NY",
            creationDate: "2024-02-05",
            finishDate: "2024-02-20",
            author: dummyAuthor,
            tasker: dummyTasker,
            ticketStatus: "OPEN",
        },
    ];
    return (
        <View style={styles.container}>
            <Layout>
                <FlatList
                    data={dummyTickets}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CardPrint {...item} />}
                    contentContainerStyle={styles.list}
                />
            </Layout>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    list: {
        paddingBottom: 20,
    },
});

export default MyTickets;