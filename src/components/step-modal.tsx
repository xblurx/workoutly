import {
    Box,
    CloseIcon,
    IconButton,
    Input,
    Modal,
    Pressable,
    Text,
    VStack,
} from 'native-base';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { formatSecondsToString } from '../utils/time';
import { CircleProgress } from './circle-progress';
import { Step, useRoutinesStore } from '../store';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Keyboard } from 'react-native';

const componentName = 'StepModal';

export const stepModalIds = {
    modal: `${componentName}-step-modal`,
    closeBtn: `${componentName}-close-btn`,
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    currentStep: Step;
};

export const StepModal = ({ isOpen, onClose, currentStep }: Props) => {
    const { name, time } = currentStep;
    const [isTimeEditing, setIsTimeEditing] = useState<boolean>(false);
    const [inputTime, setInputTime] = useState(String(time));
    const [inputName, setInputName] = useState(name);
    const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
    const { editStep } = useRoutinesStore(state => ({
        editStep: state.editStep,
    }));
    const translateYValue = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(translateYValue.value, {
                        duration: 250,
                    }),
                },
            ],
        };
    });

    const handleCloseModal = () => {
        const parsedTime = isNaN(parseInt(inputTime))
            ? 60
            : parseInt(inputTime);
        editStep({ ...currentStep, time: parsedTime, name: inputName });
        onClose();
    };

    useEffect(() => {
        const showKeyboardEvent = Keyboard.addListener(
            'keyboardWillShow',
            () => (translateYValue.value = -150)
        );
        const hideKeyboardEvent = Keyboard.addListener(
            'keyboardWillHide',
            () => (translateYValue.value = 0)
        );

        return () => {
            showKeyboardEvent.remove();
            hideKeyboardEvent.remove();
        };
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            testID={stepModalIds.modal}
        >
            <Animated.View style={[animatedStyle]}>
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <IconButton
                            variant="unstyled"
                            position="absolute"
                            right={5}
                            pt={5}
                            zIndex={2}
                            icon={<CloseIcon color="white" />}
                            onPress={handleCloseModal}
                            testID={stepModalIds.closeBtn}
                        />
                        <VStack
                            space={5}
                            alignItems="center"
                            justifyContent="center"
                            px={2}
                            py={2}
                        >
                            <Box
                                position="absolute"
                                top={110}
                                w="full"
                                alignItems="center"
                                zIndex={2}
                            >
                                {isTimeEditing ? (
                                    <Input
                                        textAlign="center"
                                        placeholder={'60s'}
                                        value={inputTime}
                                        variant="unstyled"
                                        isFullWidth={true}
                                        fontSize={48}
                                        fontWeight="medium"
                                        onChangeText={text => setInputTime(text)}
                                        onBlur={() => setIsTimeEditing(false)}
                                        autoFocus
                                        blurOnSubmit
                                    />
                                ) : (
                                    <Pressable
                                        onPress={() => setIsTimeEditing(true)}
                                    >
                                        <Text fontSize={48} fontWeight="medium">
                                            {formatSecondsToString(inputTime)}
                                        </Text>
                                    </Pressable>
                                )}
                            </Box>
                            <CircleProgress
                                currentValue={parseInt(inputTime)}
                                totalValue={60}
                            />
                            <Box w="full" alignItems="center">
                                {isNameEditing ? (
                                    <Input
                                        textAlign="center"
                                        borderColor="cyan.500"
                                        w="250px"
                                        placeholder={'Name'}
                                        value={inputName}
                                        variant="unstyled"
                                        fontSize={30}
                                        fontWeight="medium"
                                        onChangeText={name =>
                                            setInputName(name)
                                        }
                                        onBlur={() => setIsNameEditing(false)}
                                        autoFocus
                                        blurOnSubmit
                                    />
                                ) : (
                                    <Pressable
                                        onPress={() => setIsNameEditing(true)}
                                    >
                                        <Text fontSize="34" fontWeight="medium">
                                            {inputName}
                                        </Text>
                                    </Pressable>
                                )}
                            </Box>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Animated.View>
        </Modal>
    );
};
