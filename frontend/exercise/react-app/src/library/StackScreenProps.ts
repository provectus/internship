import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export interface IStackScreenProps {
    name: string;
    navigation: StackNavigationProp<any>;
    route: RouteProp<{ params: { 
        id: string,
        amount: number,
        date: string,
        description: string
        category: string 
    } }, 'params'>
}