import {render, screen} from '@testing-library/react-native';
import React from 'react';
import WeatherCurrent from '../WeatherCurrent';

describe('WeatherCurrent', () => {
  test('It sould render properly', () => {
    render(<WeatherCurrent />);
    screen.getByTestId('weather-current');
  });

  test('It should navigate to Weather screen with location', () => {
    // throw new Error('Test not implemented yet');
  });
});
