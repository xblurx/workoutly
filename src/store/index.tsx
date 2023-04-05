import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

export type Step = {
    id: string;
    name: string;
    time: number;
};

export type Routine = {
    id: string;
    name: string;
    time: number;
    steps: Step[];
};

type State = {
    routines: Routine[];
    currentRoutine: Routine;
};

export type Actions = {
    addRoutine: (id: string | undefined) => void;
    setCurrentRoutine: (id: string) => void;
    setCurrentRoutineName: (name: string) => void;
    clearCurrentRoutine: () => void;
    removeRoutine: (id: string) => void;
    editStep: (step: Step) => void;
    removeStep: (id: string) => void;
    clearSteps: () => void;
};

const initialRoutine = {
    id: '',
    name: 'Routine name',
    time: 0,
    steps: [],
};

const getStoreOpts = () => ({
    name: 'workoutly-store',
    storage: createJSONStorage(() => AsyncStorage),
})

export const useRoutinesStore = create<State & Actions>()(
    persist(
        set => ({
            routines: [],
            currentRoutine: initialRoutine,
            addRoutine: id =>
                set(state => {
                    const editedRoutineIdx = state.routines.findIndex(
                        r => r.id === id
                    );
                    const time = state.currentRoutine.steps.reduce(
                        (time, step) => time + step.time,
                        0
                    );
                    const newRoutines = [...state.routines];

                    if (editedRoutineIdx > -1) {
                        newRoutines[editedRoutineIdx] = {
                            ...state.currentRoutine,
                            time,
                        };

                        return {
                            routines: newRoutines,
                        };
                    }

                    return {
                        routines: [
                            ...newRoutines,
                            { ...state.currentRoutine, time, id: nanoid() },
                        ],
                    };
                }),
            setCurrentRoutine: id =>
                set(state => ({
                    currentRoutine: state.routines.find(r => r.id === id),
                })),
            clearCurrentRoutine: () =>
                set(() => ({ currentRoutine: initialRoutine })),
            setCurrentRoutineName: name =>
                set(state => ({
                    currentRoutine: { ...state.currentRoutine, name },
                })),
            removeRoutine: id =>
                set(state => ({
                    routines: state.routines.filter(
                        routine => routine.id !== id
                    ),
                    currentRoutine: initialRoutine,
                })),
            editStep: step =>
                set(state => {
                    const editedStepIdx = state.currentRoutine.steps.findIndex(
                        s => s.id === step.id
                    );

                    if (editedStepIdx > -1) {
                        const newSteps = [...state.currentRoutine.steps];
                        newSteps[editedStepIdx] = step;

                        return {
                            currentRoutine: {
                                ...state.currentRoutine,
                                steps: newSteps,
                            },
                        };
                    }

                    return {
                        currentRoutine: {
                            ...state.currentRoutine,
                            steps: [
                                ...state.currentRoutine.steps,
                                { ...step, id: nanoid() },
                            ],
                        },
                    };
                }),
            removeStep: id =>
                set(state => ({
                    currentRoutine: {
                        ...state.currentRoutine,
                        steps: state.currentRoutine.steps.filter(
                            step => step.id !== id
                        ),
                    },
                })),
            clearSteps: () =>
                set(state => ({
                    currentRoutine: { ...state.currentRoutine, steps: [] },
                })),
        }),
        getStoreOpts()
    )
);
