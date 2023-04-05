import { useState, useEffect, useRef } from 'react';
import type { Routine, Step } from '../store';

type ReturnType = {
    currentStep: Step | undefined;
    nextStep: Step | undefined;
    time: number;
    togglePause: () => void;
    isOver: boolean;
    onPressNextStep: () => void;
};

export const useRoutineProgress = (routine: Routine): ReturnType => {
    const intervalRef = useRef<NodeJS.Timer | undefined>();
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [isPaused, togglePause] = useState(false);
    const [time, setTime] = useState<number>(routine.steps[0].time);
    const isOver = currentStepIdx >= routine.steps.length;

    useEffect(() => {
        if ((isPaused || isOver) && intervalRef.current) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setTime(prev => {
                const newTime = prev - 1;

                if (newTime <= 0) {
                    setCurrentStepIdx(prev => prev + 1);

                    if (currentStepIdx + 1 < routine.steps.length) {
                        return routine.steps[currentStepIdx + 1].time;
                    }
                }

                return newTime;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, isOver, currentStepIdx]);

    // this is initial code I wrote before refactoring, it works okay
    // I left it here just in case I run into some bugs
    //
    // useEffect(() => {
    //     if ((isPaused || isOver) && intervalRef.current) {
    //         clearInterval(intervalRef.current)
    //         return
    //     }

    //     intervalRef.current = setInterval(() => {
    //         const totalStepTime = (routine.steps[currentStepIdx].time)

    //         if (time > 0 && !isPaused) {
    //             setTime(prev => (prev as number) - 1);
    //         } else if (time <= 0 && !isPaused) {
    //             const nextIdx = currentStepIdx + 1

    //             if (nextIdx < routine.steps.length) {
    //                 setCurrentStepIdx(nextIdx);
    //                 setTime(totalStepTime)
    //             } else {
    //                 clearInterval(intervalRef.current)
    //                 setIsOver(true);
    //             }
    //         }
    //     }, 1000);

    //     return () => clearInterval(intervalRef.current);
    // }, [time, isPaused]);

    return {
        currentStep: isOver ? undefined : routine.steps[currentStepIdx],
        nextStep:
            currentStepIdx + 1 < routine.steps.length
                ? routine.steps[currentStepIdx + 1]
                : undefined,
        time,
        togglePause: () => togglePause(p => !p),
        isOver,
        onPressNextStep: () => {
            setCurrentStepIdx(prev => prev + 1);
            setTime(routine.steps[currentStepIdx + 1].time);
        },
    };
};
