import * as React from 'react';
import { Button, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text, HStack, VStack, Fab, IconButton, Box } from 'native-base';
import { RoutinesList } from '../components/routines-list';
import { HomeIcon, PlusIcon } from '../components/icons';
import { useRoutinesStore } from '../store';
import { Layout } from '../components/layout';
import { useAssets } from 'expo-asset';
import { StartScreenImg } from '../components/images';

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: 390,
        height: 413,
    },
});

const MainScreen = ({ navigation }: { navigation: any }) => {
    const [images] = useAssets([StartScreenImg]);
    const routines = useRoutinesStore(state => state.routines);

    return (
        <Layout>
            {routines.length > 0 ? (
                <>
                    <HStack
                        py={8}
                        px={4}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text fontSize={34} fontWeight="bold">
                            My routines
                        </Text>
                        <IconButton
                            variant="unstyled"
                            icon={<HomeIcon />}
                            name="home"
                            onPress={() => navigation.navigate('home')}
                        />
                    </HStack>
                    <VStack
                        borderTopLeftRadius="20px"
                        borderTopRightRadius="20px"
                    >
                        <RoutinesList
                            navigation={navigation}
                            routines={routines}
                        />
                    </VStack>
                    <Fab
                        placement="bottom-right"
                        colorScheme="gray"
                        icon={<PlusIcon />}
                        onPress={() => navigation.navigate('create-routine')}
                        renderInPortal={false}
                    />
                </>
            ) : (
                <VStack
                    flex={1}
                    space={4}
                    w="full"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text fontSize="4xl" bold>
                        No routines yet
                    </Text>
                    <Box w="390" h="413">
                        {images ? (
                            <Image
                                style={styles.image}
                                source={images[0] as ImageSourcePropType}
                            />
                        ) : undefined}
                    </Box>
                    <Button
                        title="Get started"
                        onPress={() => navigation.navigate('create-routine')}
                    />
                </VStack>
            )}
        </Layout>
    );
};

export default MainScreen;
