import { extendTheme } from 'native-base';

export const theme = extendTheme({
    components: {
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
