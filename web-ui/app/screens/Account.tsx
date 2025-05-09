import { FC } from 'react';
import {Pressable, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import Layout from "@/components/Layout";
import {useAuth} from "@/hooks/useAuth";
import {AuthService} from "@/services/auth.service";

const Account: FC = () => {
    const {navigate} = useNavigation<TypeRootStackParamList>();
    const {user, setUser} = useAuth();


   const handleLogout = async () => {
           try {
               AuthService.logout();
               setUser(null);
               navigate("Home");
           } catch (error) {
               console.error("Log out error:", error);
           }
       };

       return (
           <View>
               <Text>Account</Text>
               <Button mode="contained" onPress={handleLogout}>
                   Log out
               </Button>
           </View>
       );
};

export default Account;