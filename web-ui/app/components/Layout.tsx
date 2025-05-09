import React from 'react';
import { FC, PropsWithChildren } from 'react';
import {ScrollView, View, StyleSheet, SafeAreaView} from 'react-native';
import { Surface } from 'react-native-paper';
import clsx from 'clsx';

interface ILayout {
    className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.viewContainer}>{children}</View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FAFAFA",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    viewContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 16,
    },
});


export default Layout;