import React from "react";
import {StyleSheet, View} from "react-native";
import {Appbar, Text, IconButton} from "react-native-paper";
import {useAuth} from "@/hooks/useAuth";
import {useNavigation} from "@react-navigation/native";
import {Feather} from "@expo/vector-icons";
import {TypeRootStackParamList} from "@/navigation/navigation.types";

const HomeHeader: React.FC = () => {
    const {user} = useAuth();
    const {navigate} = useNavigation<TypeRootStackParamList>();

    return (

        <View style={styles.shadowContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Home</Text>
                {user ? (
                    <Text style={styles.balance}>100$</Text>
                ) : (
                    <IconButton
                        icon={() => <Feather name="user-plus" size={26}/>}
                        onPress={() => navigate("Auth")}
                        style={styles.icon}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: "#FAFAFA",
        paddingTop: 12,
        paddingBottom: 12,
        // ...Platform.select({
        //     ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
            // },
            // android: {
            //     elevation: 8,
            // },
        // }),
    },
    header: {
        backgroundColor: "#FAFAFA",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    icon: {
        position: "absolute",
        right: 10,
    },
    balance: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2E8B57",
        position: "absolute",
        right: 16,
    },
});


export default HomeHeader;