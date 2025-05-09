import { FC } from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import HomeHeader from "@/components/headers/HomeHeader";
import Layout from "@/components/Layout";

const OpenTickets: FC = () => {
    const {navigate} = useNavigation<TypeRootStackParamList>();

    return (
        <View style={styles.container}>
            <Layout>
                <Text>Tickets</Text>
            </Layout>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default OpenTickets;