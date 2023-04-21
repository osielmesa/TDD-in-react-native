import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import WeatherCurrent from '../../components/WeatherCurrent';
import {View} from 'react-native';
import WeatherCoordinates from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCurrent', () =>
  jest.fn().mockReturnValue(null),
);
jest.mock('../../components/WeatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  test('it should render properly', () => {
    render(<HomeScreen />);
    screen.getByTestId('home-screen');
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern');
      jest.setSystemTime(946684800000); // Saturday, 01 January 2000 00:00 UTC
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('It should contain current date', () => {
      render(<HomeScreen />);
      screen.getByText('Jan 01, 2000');
    });

    test('It should contain current day', () => {
      render(<HomeScreen />);
      screen.getByText('Saturday');
    });
  });

  test('It should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
      <View testID={'mock-weather-current'} />,
    );
    render(<HomeScreen />);
    screen.getByTestId('mock-weather-current');
  });

  test('It should contain a divider', () => {
    render(<HomeScreen />);
    screen.getByTestId('home-screen-divider');
  });

  test('It should contain a section weather at given coordinates', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
      <View testID={'mock-weather-coordinates'} />,
    );
    render(<HomeScreen />);
    screen.getByTestId('mock-weather-coordinates');
  });
});
