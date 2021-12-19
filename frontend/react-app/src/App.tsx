import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import routes from './config/routes';


const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
                {routes.map((r, i) => (
                    <Stack.Screen key={i} name={r.name} component={r.component} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}