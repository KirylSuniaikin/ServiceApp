import {TypeNavigate} from "@/components/bottom-menu/menu.interface";
import {FC} from "react";
import {Platform, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {generalMenuItems, taskerMenuItems} from "@/components/bottom-menu/menu.data";
import {useAuth} from "@/hooks/useAuth";
import {UserTypeEnum} from "@/types/types";
import MenuItem from "@/components/bottom-menu/MenuItem";
import { StyleSheet } from 'react-native';


interface IBottomMenuProps {
    nav: TypeNavigate
    currentRoute?: string
}

const BottomMenu: FC<IBottomMenuProps> = props => {
    const {user} = useAuth();

    return (
        <View style={[styles.menuContainer]}>
            {user && user.type === UserTypeEnum.TASKER ? (
                taskerMenuItems.map((item, index) => (
                    <MenuItem
                        key={item.path}
                        item={item}
                        {...props}
                    />
                ))
            ) : (
                generalMenuItems.map(item => (
                    <MenuItem
                        key={item.path}
                        item={item}
                        {...props}
                    />
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        height: 60,
        borderTopWidth: 1,
        borderColor: "#EAEAEA",
        // ...Platform.select({
        //     ios: {
        // overflow: "visible",
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: -3 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // },
        // android: {
        //     elevation: 10,
        // },
        // }),
    },
});


export default BottomMenu;