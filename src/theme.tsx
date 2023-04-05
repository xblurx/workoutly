import { extendTheme } from 'native-base';

export const theme = extendTheme({
    components: {
        Center: {
            baseStyle: {
                bg: 'dark.50',
            },
        },
        ModalContent: {
            baseStyle: {
                rounded: '3xl',
            },
        },
    },
    config: {
        initialColorMode: 'dark',
    },
});
