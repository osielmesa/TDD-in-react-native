import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import React from 'react';
import WeatherCurrent from '../WeatherCurrent';
import {useNavigation} from '@react-navigation/native';
import LocationService from '../../services/LocationService';
import {Colors} from '../../constants';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCurrent', () => {
  test('It sould render properly', () => {
    render(<WeatherCurrent />);
    screen.getByTestId('weather-current');
  });

  test('It should render label', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByText('Weather at my position');
  });

  test('It should navigate to Weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({navigate: mockNavigate});

    const wrapper = render(<WeatherCurrent />);
    const button = wrapper.getByTestId('weather-current');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Loader', () => {
    test('It should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await expect(
        wrapper.findByTestId('button-loading'),
      ).resolves.toBeDefined();

      await act(async () => {
        await mockResolve({latitude: 0, longitude: 0});
      });
    });

    test('It should be removed when position has been fetched', async () => {
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitForElementToBeRemoved(() =>
        wrapper.getByTestId('button-loading'),
      );
    });

    test('It should be removed when position has been fetched with error', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitForElementToBeRemoved(() =>
        wrapper.getByTestId('button-loading'),
      );
    });
  });

  describe('Error', () => {
    test('It should be displayed after fetching has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(button).toHaveStyle({borderColor: Colors.ERROR});
      });
    });

    test('It should be reset after fetching position again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        fireEvent.press(button);
        expect(button).not.toHaveStyle({borderColor: Colors.ERROR});
      });
    });
  });
});
