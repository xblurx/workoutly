import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/main-screen';
import RoutineForm from './screens/routine-form';
import RoutineProgress from './screens/routine-progress';

export const ROUTES = {
    HOME: 'home',
    CREATE_ROUTINE: 'create-routine',
    PLAY_ROUTINE: 'play-routine',
};

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={ROUTES.HOME}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={ROUTES.HOME} component={MainScreen} />
            <Stack.Screen
                name={ROUTES.CREATE_ROUTINE}
                component={RoutineForm}
            />
            <Stack.Screen
                name={ROUTES.PLAY_ROUTINE}
                component={RoutineProgress}
            />
        </Stack.Navigator>
    );
};

export default Navigator;
