import { Flex, Text } from 'native-base';
import * as React from 'react';
import { View } from 'moti';
import { makeStyledComponent } from '../utils/styled';

const StyledView = makeStyledComponent(View);

type CardProps = {
    name: string;
    time: number | string;
    children?: React.ReactNode;
};

export const AnimatedCard = ({ children }: { children: React.ReactNode }) => (
    <StyledView
        w="full"
        from={{
            opacity: 0,
            scale: 0.5,
            marginBottom: -46,
        }}
        animate={{
            opacity: 1,
            scale: 1,
            marginBottom: 0,
        }}
        exit={{
            opacity: 0,
            scale: 0.5,
            marginBottom: -46,
        }}
    >
        {children}
    </StyledView>
);

export const Card = ({ name, time, children }: CardProps) => (
    <Flex
        w="360px"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="dark.100"
        borderRadius="20"
        px={4}
        py={6}
    >
        <Text fontSize={18} fontWeight="medium">
            {name}
        </Text>
        {children}
        <Text fontSize={18} fontWeight="medium">
            {time}
        </Text>
    </Flex>
);
