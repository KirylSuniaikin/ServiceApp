import {TypeRootStackParamList} from "@/navigation/navigation.types";
import {TypeFeatherIconNames} from "@/types/types";

export interface IMenuItem {
    icon: TypeFeatherIconNames
    path: keyof TypeRootStackParamList
 }

 export type TypeNavigate = (screenName: keyof TypeRootStackParamList) => void