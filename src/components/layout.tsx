import { Box } from 'native-base';
import * as React from 'react';

type Props = {
    children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
    <Box flex={1} w="full" bg="dark.50" pt={8}>
        {children}
    </Box>
);
