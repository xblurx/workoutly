import * as React from 'react';
import { Routine as TRoutine } from '../store';
import { formatSecondsToString } from '../utils/time';
import { Card, SwipableCardProps } from './card';

type Props = {
    routine: TRoutine;
} & SwipableCardProps;

const Routine = ({ routine, onRemove, simultaneousHandlers }: Props) => (
    <Card
        onRemove={onRemove}
        simultaneousHandlers={simultaneousHandlers}
        name={routine.name}
        time={formatSecondsToString(routine.time)}
    />
);

export default Routine;
