import { AnimatePresence } from 'moti';
import { IconButton, Pressable, VStack } from 'native-base';
import * as React from 'react';
import { useRef } from 'react';
import { Routine, useRoutinesStore } from '../store';
import { formatSecondsToString } from '../utils/time';
import { AnimatedCard, Card } from './card';
import { PlayIcon } from './icons';
import { SwipeView } from './swipable-view';

type Props = {
    navigation: any;
    routines: Routine[];
};

export const RoutinesList = ({ navigation, routines }: Props) => {
    const refScrollView = useRef(null);
    const removeRoutine = useRoutinesStore(state => state.removeRoutine);

    return (
        <AnimatePresence>
            <VStack space={4} alignItems="center">
                {routines.map(routine => (
                    <Pressable
                        key={routine.id}
                        onPress={() =>
                            navigation.navigate('create-routine', {
                                routineId: routine.id,
                            })
                        }
                    >
                        <AnimatedCard>
                            <SwipeView
                                simultaneousHandlers={refScrollView}
                                onSwipeLeft={() => removeRoutine(routine.id)}
                            >
                                <Card
                                    name={routine.name}
                                    time={formatSecondsToString(routine.time)}
                                >
                                    <IconButton
                                        variant="unstyled"
                                        py={-2}
                                        icon={<PlayIcon fill="white" />}
                                        name="play-routine"
                                        onPress={() =>
                                            navigation.navigate(
                                                'play-routine',
                                                { routineId: routine.id }
                                            )
                                        }
                                    />
                                </Card>
                            </SwipeView>
                        </AnimatedCard>
                    </Pressable>
                ))}
            </VStack>
        </AnimatePresence>
    );
};
