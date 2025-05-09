import { FC } from 'react';
import {Pressable, Text, View} from 'react-native';
import {IMenuItem, TypeNavigate} from "@/components/bottom-menu/menu.interface";
import {Feather} from "@expo/vector-icons";
import { StyleSheet } from 'react-native';


interface IMenuItemProps {
    item: IMenuItem
    nav: TypeNavigate
    currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({item,nav,currentRoute}) => {
    const isActive = currentRoute === item.path;

    return (
        <Pressable
        onPress={() => nav(item.path)}
        style={({ pressed }) => [
            styles.menuItem,
        ]}
        >
            <Feather
                name={item.icon}
                size={26}
                color={isActive ? '#47AA52' : '#374151'}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
    },
});

export default MenuItem;