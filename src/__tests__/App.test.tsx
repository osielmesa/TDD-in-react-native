import React from 'react';
import {render} from '@testing-library/react-native';
import AppNavigator from '../screens';
import {View} from 'react-native';
import App from '../App';

jest.mock('../screens', () => jest.fn());

describe('App', () => {
  test('It should render routes properly', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID={'mock-routes'} />,
    );

    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });
});
