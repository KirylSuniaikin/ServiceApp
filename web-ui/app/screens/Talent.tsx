import { FC } from 'react';
import {Pressable, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {TypeRootStackParamList} from "@/navigation/navigation.types";

const Talent: FC = () => {
    const {navigate} = useNavigation<TypeRootStackParamList>();

    return (
        <View>
            <Text>Talents</Text>
        </View>
    );
}

export default Talent;