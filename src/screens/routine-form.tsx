import { AnimatePresence } from 'moti';
import {
    Box,
    Fab,
    HStack,
    IconButton,
    Input,
    Pressable,
    VStack,
} from 'native-base';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AnimatedCard, Card } from '../components/card';
import { HomeIcon, PlusIcon } from '../components/icons';
import { Layout } from '../components/layout';
import { StepModal } from '../components/step-modal';
import { SwipeView } from '../components/swipable-view';
import { Step, useRoutinesStore } from '../store';
import { formatSecondsToString } from '../utils/time';

const componentName = 'RoutineForm';

export const routineFormIds = {
    homeBtn: `${componentName}-home-btn`,
    openAddStepModal: `${componentName}-open-add-step-modal`,
};

type Props = {
    navigation: any;
    route: any;
};

const initialStep: Step = {
    time: 60,
    name: 'Name',
    id: '',
};

const RoutineForm = ({ route, navigation }: Props) => {
    const refScrollView = useRef(null);
    const { routineId } = route.params || {};
    const currentRoutine = useRoutinesStore(state => state.currentRoutine);
    const [currentStep, setCurrentStep] = useState<Step>(initialStep);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        removeStep,
        setCurrentRoutine,
        setCurrentRoutineName,
        clearCurrentRoutine,
        addRoutine,
    } = useRoutinesStore(state => ({
        addRoutine: state.addRoutine,
        setCurrentRoutine: state.setCurrentRoutine,
        setCurrentRoutineName: state.setCurrentRoutineName,
        clearCurrentRoutine: state.clearCurrentRoutine,
        removeStep: state.removeStep,
    }));

    const handlePressStep = (step: Step) => {
        setCurrentStep(step);
        setIsModalOpen(true);
    };

    const handleRemoveStep = (id: string) => () => removeStep(id);

    useEffect(() => {
        if (routineId) {
            setCurrentRoutine(routineId);
        }

        return () => {
            addRoutine(routineId);
            clearCurrentRoutine();
        };
    }, [routineId]);

    return (
        <Layout>
            <HStack
                py={8}
                px={4}
                justifyContent="space-between"
                alignItems="center"
            >
                <Box w="250px">
                    <Input
                        placeholder="Routine name"
                        value={currentRoutine.name}
                        variant="unstyled"
                        isFullWidth={true}
                        fontSize={34}
                        fontWeight="medium"
                        onChangeText={text => setCurrentRoutineName(text)}
                        blurOnSubmit
                    />
                </Box>
                <IconButton
                    variant="unstyled"
                    testID={routineFormIds.homeBtn}
                    icon={<HomeIcon />}
                    name="home"
                    onPress={() => navigation.navigate('home')}
                />
            </HStack>
            <AnimatePresence>
                <VStack space={4} alignItems="center">
                    {currentRoutine.steps.map(step => (
                        <Pressable
                            key={step.id}
                            onPress={() => handlePressStep(step)}
                        >
                            <AnimatedCard>
                                <SwipeView
                                    simultaneousHandlers={refScrollView}
                                    onSwipeLeft={handleRemoveStep(step.id)}
                                >
                                    <Card
                                        name={step.name}
                                        time={formatSecondsToString(step.time)}
                                    />
                                </SwipeView>
                            </AnimatedCard>
                        </Pressable>
                    ))}
                </VStack>
            </AnimatePresence>

            <StepModal
                key={String(isModalOpen)}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentStep={currentStep}
            />

            <Fab
                placement="bottom-right"
                colorScheme="gray"
                icon={<PlusIcon />}
                onPress={() => handlePressStep(initialStep)}
                renderInPortal={false}
                testID={routineFormIds.openAddStepModal}
            />
        </Layout>
    );
};

export default RoutineForm;
