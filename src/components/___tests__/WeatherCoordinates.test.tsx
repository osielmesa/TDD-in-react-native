import React from 'react';
import {render, screen} from '@testing-library/react-native';
import WeatherCoordinates from '../WeatherCoordinates';

describe('WeatherCoordinates', () => {
  test('It should render properlyt', () => {
    render(<WeatherCoordinates />);
    screen.getByTestId('weather-coordinates');
  });
});
