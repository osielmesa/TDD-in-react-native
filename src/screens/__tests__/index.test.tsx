import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import AppNavigator from '../index';
import HomeScreen from '../HomeScreen';
import {View} from 'react-native';

jest.mock('../HomeScreen', () => jest.fn());

describe('AppNavigator', () => {
  test('It should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID={'mock-home-screen'} />,
    );
    render(<AppNavigator />);
    await waitFor(() => {
      screen.getByTestId('mock-home-screen');
    });
  });
});
