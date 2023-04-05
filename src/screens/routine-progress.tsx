import * as React from 'react';
import { Box, HStack, IconButton, Pressable, Text } from 'native-base';
import { Routine, useRoutinesStore } from '../store';
import { CircleProgress } from '../components/circle-progress';
import { formatSecondsToString } from '../utils/time';
import { AnimatedCard, Card } from '../components/card';
import { PauseIcon, PlayIcon, StopIcon } from '../components/icons';
import { useEffect, useState } from 'react';
import { useRoutineProgress } from '../hooks/useRoutineProgress';
import { Button } from 'react-native';
import { Layout } from '../components/layout';
import useSound from '../hooks/useSounds';

type Props = {
    navigation: any;
    route: any;
};

const RoutineProgress = ({ navigation, route }: Props) => {
    const { routineId } = route.params;
    const routine = useRoutinesStore(state =>
        state.routines.find(r => r.id === routineId)
    ) as Routine;
    const [isPaused, setIsPaused] = useState(false);
    const pauseIcon = isPaused ? <PlayIcon fill="darkviolet" /> : <PauseIcon />;
    const sounds = useSound();
    const {
        currentStep,
        nextStep,
        time,
        togglePause,
        isOver,
        onPressNextStep,
    } = useRoutineProgress(routine);

    const handlePause = () => {
        setIsPaused(p => !p);
        togglePause();
    };

    useEffect(() => {
        const play = async () => {
            if (isOver) {
                await sounds.workoutEnd?.play();
                return;
            }

            await sounds.changeStep?.play();
        };

        play();
    }, [isOver, currentStep]);

    return (
        <Layout>
            <Box alignItems="center">
                {isOver ? (
                    <Box justifyContent="center" h="full">
                        <Text pt={2} fontSize={48} fontWeight="bold">
                            Nice work!
                        </Text>
                        <Button
                            title="Return home"
                            onPress={() => navigation.navigate('home')}
                        />
                    </Box>
                ) : (
                    <>
                        <Box
                            position="absolute"
                            top={205}
                            w="full"
                            alignItems="center"
                        >
                            <Text fontSize={48} fontWeight="medium">
                                {formatSecondsToString(time)}
                            </Text>
                        </Box>

                        {currentStep ? (
                            <Box pt="120px">
                                <CircleProgress
                                    currentValue={time}
                                    totalValue={currentStep.time}
                                />
                            </Box>
                        ) : undefined}

                        <Text pt={2} fontSize={34} fontWeight="medium">
                            {currentStep?.name}
                        </Text>

                        <HStack pt={8} space={4}>
                            <IconButton
                                variant="unstyled"
                                icon={pauseIcon}
                                name="pause-routine"
                                onPress={handlePause}
                            />
                            <IconButton
                                variant="unstyled"
                                icon={<StopIcon />}
                                name="stop-routine"
                                onPress={() => navigation.navigate('home')}
                            />
                        </HStack>

                        {nextStep ? (
                            <Pressable onPress={onPressNextStep}>
                                <Box pt="100px" justifyContent="center">
                                    <AnimatedCard>
                                        <Card
                                            name={`Next Up: ${nextStep.name}`}
                                            time={formatSecondsToString(
                                                nextStep.time
                                            )}
                                        />
                                    </AnimatedCard>
                                </Box>
                            </Pressable>
                        ) : undefined}
                    </>
                )}
            </Box>
        </Layout>
    );
};

export default RoutineProgress;
