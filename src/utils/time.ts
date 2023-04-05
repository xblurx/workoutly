export const formatSecondsToString = (value: string | number): string => {
    const time = (
        Number.isInteger(value) ? value : parseInt(value as string)
    ) as number;
    if (isNaN(time as number)) return '60s';

    const minutes = Math.floor(time / 60);
    const secondsLeft = time % 60;

    return minutes <= 0 || time === 60
        ? `${time}s`
        : `${minutes}m ${secondsLeft ? `${secondsLeft}s` : ''}`;
};
