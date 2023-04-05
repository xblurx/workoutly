import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { theme } from './theme';

type Props = {
    children: React.ReactNode;
};

// this is for testing
const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Providers = ({ children }: Props) => {
    return (
        <NavigationContainer>
            <NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
                {children}
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default Providers;
