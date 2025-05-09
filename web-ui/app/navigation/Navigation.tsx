import React, {FC, useEffect, useState} from "react";
import {View, StyleSheet, Platform} from "react-native";
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {useAuth} from "@/hooks/useAuth";
import PrivateNavigator from "@/navigation/PrivateNavigator";
import BottomMenu from "@/components/bottom-menu/BottomMenu";
import {SafeAreaView} from "react-native-safe-area-context";
import {generalRoutes} from "@/navigation/routes";

const Navigation: FC = () => {
    const {user} = useAuth();
    const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
    const navRef = useNavigationContainerRef();

    useEffect(() => {
        setCurrentRoute(navRef.getCurrentRoute()?.name);

        const listener = navRef.addListener("state", () => {
            setCurrentRoute(navRef.getCurrentRoute()?.name);
        });

        return () => {
            navRef.removeListener("state", listener);
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationContainer ref={navRef}>
                <PrivateNavigator/>
            </NavigationContainer>
            {currentRoute !== 'Chat' && (
                <BottomMenu nav={navRef.navigate} currentRoute={currentRoute}/>
            )}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        overflow: "visible"
    },
    shadowContainer: {
        // ...Platform.select({
        //     ios: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        // },
        // android: {
        //     elevation: 10,
        // },
        // }),
    },
});

export default Navigation;