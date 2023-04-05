import React from 'react';
import Svg, { Defs, Stop, Path, RadialGradient } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CircleProgress = ({ value }: { value: number }) => {
    const circumference = 2 * Math.PI * 50;
    const progress = (value / 100) * circumference;

    const animatedProps = useAnimatedProps(() => {
        const offset = circumference - progress;
        return {
            strokeDashoffset: offset.toFixed(2),
        };
    });

    return (
        <Svg width={100} height={100}>
            <Defs>
                <RadialGradient
                    id="gradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                >
                    <Stop offset="0%" stopColor="#FFFFFF" />
                    <Stop offset="100%" stopColor="#8A2BE2" />
                </RadialGradient>
            </Defs>
            <AnimatedPath
                d="M50,10 a 40,40 0 1 1 0,80 a 40,40 0 1 1 0,-80"
                fill="none"
                stroke="url(#gradient)"
                strokeLinecap="round"
                strokeDasharray={`${circumference.toFixed(
                    2
                )} ${circumference.toFixed(2)}`}
                animatedProps={animatedProps}
                strokeWidth={10}
            />
        </Svg>
    );
};
