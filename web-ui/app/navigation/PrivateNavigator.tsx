import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {FC} from "react";
import {TypeRootStackParamList} from "@/navigation/navigation.types";
import {useAuth} from "@/hooks/useAuth";
import {UserTypeEnum} from "@/types/types";
import {generalRoutes, taskerRoutes} from "@/navigation/routes";

const Stack = createNativeStackNavigator<TypeRootStackParamList>(
)

const PrivateNavigator: FC = () => {
    const { user } = useAuth();
    // console.log(user)
    return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: '#ffffff'
                    }
                }}>
                {user && user.type === UserTypeEnum.TASKER ? (
                    taskerRoutes.map(route => (
                            <Stack.Screen key={route.name} name={route.name} component={route.component}/>
                        ))
                    ) : (
                    generalRoutes.map(route => (
                            <Stack.Screen key={route.name} name={route.name} component={route.component}/>
                        ))
                )}
            </Stack.Navigator>
    )
}

export default PrivateNavigator;