// import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { fireEvent, render, screen } from '@testing-library/react-native';

import HomeScreen from '.';

it('Note must be added', async () => {
  console.log('smth');
  const application = (
    // <Provider store={store}>
    <HomeScreen />
    // </Provider>
  );

  render(application);

  fireEvent.press(await screen.findByTestId('add-button'));

  fireEvent.changeText(await screen.findByTestId('name-input'), 'Hello there');

  fireEvent.press(await screen.findByTestId('save-button'));

  const items = await screen.findByTestId('list-item');

  expect(items.props.title).toBe('Hello there');
});
