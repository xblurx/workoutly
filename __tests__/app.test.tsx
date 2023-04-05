import {
    render,
    screen,
    fireEvent,
    within,
} from '@testing-library/react-native';
import App from '../src/';
import { stepModalIds } from '../src/components/step-modal';
import { routineFormIds } from '../src/screens/routine-form';

jest.mock('expo-asset')
jest.mock('expo-av')

describe('App', () => {
    beforeEach(() => render(<App />));

    test('1. renders the start screen', () => {
        expect(screen.getByText('No routines yet')).toBeOnTheScreen();
        expect(
            screen.getByRole('button', { name: 'Get started' })
        ).toBeOnTheScreen();
    });

    test('2. opens the routine screen form when "Get started" button is pressed', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }));

        expect(
            screen.getByTestId(routineFormIds.openAddStepModal)
        ).toBeOnTheScreen();
    });

    test('3. adds a step', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }));

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));

        fireEvent.press(screen.getByText('60s'));
        fireEvent.changeText(screen.getByPlaceholderText('60s'), '90');
        fireEvent.press(screen.getByText('Name'));
        fireEvent.changeText(
            screen.getByPlaceholderText('Name'),
            'New step name'
        );

        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        expect(screen.getByText('1m 30s')).toBeOnTheScreen();
        expect(screen.getByText('New step name')).toBeOnTheScreen();
    });

    test('4. deletes a step when a card is swiped left', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }));

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));
        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        expect(screen.getByText('60s')).toBeOnTheScreen();
        expect(screen.getByText('Name')).toBeOnTheScreen();

        fireEvent(screen.getByText('60s'), 'onSwipeLeft');

        expect(screen.queryByText('60s')).not.toBeOnTheScreen();
    });

    test('5. deletes a routine when a card is swiped left', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }));

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));
        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        fireEvent.press(screen.getByTestId(routineFormIds.homeBtn));
        expect(screen.getByText('Routine name')).toBeOnTheScreen();

        fireEvent(screen.getByText('Routine name'), 'onSwipeLeft');

        expect(screen.queryByText('Routine name')).not.toBeOnTheScreen();
    });

    test('6. saves routine name when edited', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }));

        const routineNameInput = screen.getByPlaceholderText('Routine name');
        fireEvent.changeText(routineNameInput, 'Woah cool');

        fireEvent(routineNameInput, 'blur');

        expect(screen.getByDisplayValue('Woah cool')).toBeOnTheScreen();
    });

    test('7. returns to home screen when home button is pressed', async () => {
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }))

        fireEvent.press(screen.getByTestId(routineFormIds.homeBtn));

        expect(screen.getByText('My routines')).toBeOnTheScreen();
    });

    test('8. create routine with steps and verify that it is saved', async () => {
        const newStepName = 'Red hot';
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }))

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));

        fireEvent.press(screen.getByText('60s'));
        fireEvent.changeText(screen.getByPlaceholderText('60s'), '115');
        fireEvent.press(screen.getByText('Name'));
        fireEvent.changeText(screen.getByPlaceholderText('Name'), newStepName);

        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        const routineNameInput = screen.getByPlaceholderText('Routine name');
        fireEvent.changeText(routineNameInput, 'Woah cool');

        fireEvent(routineNameInput, 'blur');

        fireEvent.press(screen.getByTestId(routineFormIds.homeBtn));

        expect(screen.getByText('Woah cool')).toBeOnTheScreen();
        fireEvent.press(screen.getByText('Woah cool'));

        expect(screen.getByText('1m 55s')).toBeOnTheScreen();
        expect(screen.getByText(newStepName)).toBeOnTheScreen();
    });

    test('9. verify that step modal values changes depenging when clicking on existing step and create one from scratch', async () => {
        const newStepName = 'Red hot';
        fireEvent.press(screen.getByRole('button', { name: 'Get started' }))

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));

        fireEvent.press(screen.getByText('60s'));
        fireEvent.changeText(screen.getByPlaceholderText('60s'), '23');
        fireEvent.press(screen.getByText('Name'));
        fireEvent.changeText(screen.getByPlaceholderText('Name'), newStepName);

        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        fireEvent.press(screen.getByTestId(routineFormIds.openAddStepModal));
        const modalOne = within(screen.getByTestId(stepModalIds.modal))

        expect(modalOne.queryByText('60s')).toBeOnTheScreen()
        expect(modalOne.queryByText('Name')).toBeOnTheScreen()
        expect(modalOne.queryByText('23s')).not.toBeOnTheScreen()
        expect(modalOne.queryByText(newStepName)).not.toBeOnTheScreen()

        fireEvent.press(screen.getByTestId(stepModalIds.closeBtn));

        fireEvent.press(screen.getByText('23s'))
        const modalTwo = within(screen.getByTestId(stepModalIds.modal))

        expect(modalTwo.queryByText('60s')).not.toBeOnTheScreen()
        expect(modalTwo.queryByText('Name')).not.toBeOnTheScreen()
        expect(modalTwo.queryByText('23s')).toBeOnTheScreen()
        expect(modalTwo.queryByText(newStepName)).toBeOnTheScreen()



    })
});

// screen.debug({ mapProps: ({ style, ...props }) => ({ value: props.value, testId: props.testID, children: props.children }) });
// await waitForElementToBeRemoved(() =>
//     screen.queryByTestId(stepModalIds.modal)
// );
