import React from 'react';
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, G, RadialGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
    currentValue: number;
    totalValue: number;
};

export const CircleProgress = ({ currentValue, totalValue }: Props) => {
    const seconds = currentValue < 60 ? currentValue : 60;
    const radius = 100;
    const strokeWidth = 20;
    const circumference = 2 * Math.PI * radius;

    const progress = useDerivedValue(() =>
        withTiming((seconds / totalValue) * circumference, {
            duration: 1000,
        })
    );

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circumference - progress.value,
        };
    });

    return (
        <Svg
            width={2 * (radius + strokeWidth)}
            height={2 * (radius + strokeWidth)}
        >
            <Defs>
                <RadialGradient
                    id="grad"
                    cx="30%"
                    cy="30%"
                    rx="30%"
                    ry="90%"
                    fx="50%"
                    fy="50%"
                >
                    <Stop offset="0" stopColor="#ffffff" />
                    <Stop offset="1" stopColor="#8a2be2" />
                </RadialGradient>
            </Defs>
            <G
                transform={`rotate(-90 ${radius + strokeWidth} ${
                    radius + strokeWidth
                })`}
            >
                <AnimatedCircle
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                    r={radius}
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                />
            </G>
        </Svg>
    );
};
