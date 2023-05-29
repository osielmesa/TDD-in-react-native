import React from 'react';
import {useNavigation} from '@react-navigation/native';
import WeatherScreen from '../WeatherScreen';
import {fireEvent, mockStore, render} from '../../utils/test.utils';
import {act, waitFor} from '@testing-library/react-native';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../../store/weather';
import {nullWeather} from '../../types/Weather';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({goBack: jest.fn()}),
    useRoute: jest.fn().mockReturnValue({params: {longitude: 0, latitude: 0}}),
  };
});

describe('WeatherScreen', function () {
  test('It should render correctly', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen');
  });

  test('It should return to home when button home is pressed', () => {
    const mockGoBack = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({goBack: mockGoBack});

    const wrapper = render(<WeatherScreen />);
    const button = wrapper.getByText('Home');
    fireEvent.press(button);
    expect(mockGoBack).toHaveBeenCalled();
  });

  test('It should fetch weather', async () => {
    const interceptor = jest.fn();
    const store = mockStore(interceptor);

    render(<WeatherScreen />, {store});

    await waitFor(() => {
      expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0));
    });
  });

  test('It should display loader when fetching weather', () => {
    const wrapper = render(<WeatherScreen />);
    wrapper.getByTestId('weather-screen-loader');
  });

  test('It should display given error', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherFailure('mock-error'));
    });

    wrapper.getByText('mock-error');
  });

  test('It should display image with given weather icon', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, icon: 'mock-icon'}));
    });

    const image = wrapper.getByTestId('weather-screen-icon');
    expect(image).toHaveProp('source', {uri: 'mock-icon'});
  });

  test('It should not display icon when weather has no icon', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => wrapper.getByTestId('weather-screen-icon')).toThrow();
  });

  test('It should display description from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(
        fetchWeatherSuccess({...nullWeather, description: 'mock-description'}),
      );
    });

    wrapper.getByText('mock-description');
  });

  test('It should not display description when weather has no description', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess(nullWeather));
    });

    expect(() => wrapper.getByTestId('weather-screen-description')).toThrow();
  });

  test('It should display city name from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, city: 'mock-city'}));
    });

    wrapper.getByText('mock-city');
  });

  test('It should display formatted temperature from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, temperature: 10.8}));
    });

    const container = wrapper.getByTestId('weather-screen-temperature');
    const title = wrapper.getByText('temperature');
    const temperature = wrapper.getByText('11°C');

    expect(container).toContainElement(title);
    expect(container).toContainElement(temperature);
  });

  test('It should display formatted wind from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, windSpeed: 1}));
    });

    const container = wrapper.getByTestId('weather-screen-wind');
    const title = wrapper.getByText('wind');
    const wind = wrapper.getByText('1m/s');

    expect(container).toContainElement(title);
    expect(container).toContainElement(wind);
  });

  test('It should display formatted humidity from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, humidity: 15}));
    });

    const container = wrapper.getByTestId('weather-screen-humidity');
    const title = wrapper.getByText('humidity');
    const humidity = wrapper.getByText('15%');

    expect(container).toContainElement(title);
    expect(container).toContainElement(humidity);
  });

  test('It should display formatted pressure from given weather', () => {
    const store = mockStore();
    const wrapper = render(<WeatherScreen />, {store});
    act(() => {
      store.dispatch(fetchWeatherSuccess({...nullWeather, pressure: 1000}));
    });

    const container = wrapper.getByTestId('weather-screen-pressure');
    const title = wrapper.getByText('pressure');
    const pressure = wrapper.getByText('1000 hPa');

    expect(container).toContainElement(title);
    expect(container).toContainElement(pressure);
  });
});
