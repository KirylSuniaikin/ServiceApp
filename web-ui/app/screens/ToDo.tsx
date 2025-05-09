import { FC } from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {TypeRootStackParamList} from "@/navigation/navigation.types";

const ToDo: FC = () => {
    const {navigate} = useNavigation<TypeRootStackParamList>();

    return (
        <View>
            <Text>"ToDo"</Text>
        </View>
    );
}

export default ToDo;