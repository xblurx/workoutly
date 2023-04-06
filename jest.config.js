module.exports = {
    preset: "@testing-library/react-native",
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
    setupFilesAfterEnv: ['./jest-setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|moti|nanoid|native-base|react-native-reanimated|expo-status-bar)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    fakeTimers: {
        enableGlobally: true,
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': "identity-obj-proxy"
    },
}
