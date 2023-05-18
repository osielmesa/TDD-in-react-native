import {recordSaga} from '../../../utils/test.utils';
import {weatherStartWorker} from '../saga';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../actions';
import {nullWeather} from '../../../types/Weather';
import WeatherService from '../../../services/WeatherService';

describe('store/weather', () => {
  describe('saga', () => {
    describe('onStart', () => {
      test('It should call fetchWeather API and dispatch success action when successful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockResolvedValueOnce(nullWeather);
        const dispatched = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );
        expect(dispatched).toStrictEqual([fetchWeatherSuccess(nullWeather)]);
      });

      test('It should call fetchWeather API and dispatch failure action when successful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockRejectedValueOnce(new Error('mock-error'));
        const dispatched = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );
        expect(dispatched).toStrictEqual([fetchWeatherFailure('mock-error')]);
      });
    });
  });
});
