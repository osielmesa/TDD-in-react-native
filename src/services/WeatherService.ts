import {WeatherType} from '../types/Weather';
import {CurrentWeatherRawResponseDto} from './dto/weather-service-dto';
import axios, {AxiosResponse} from 'axios';

class WeatherService {
  static async fetchCurrentWeather(
    lat: number,
    lon: number,
  ): Promise<WeatherType> {
    return axios
      .get<CurrentWeatherRawResponseDto>(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: '2c111b7844445599b02a6671f25a3ac5',
            units: 'metric',
          },
        },
      )
      .then(WeatherService.formatCurrentWeatherResponse);
  }

  private static async formatCurrentWeatherResponse(
    response: AxiosResponse<CurrentWeatherRawResponseDto>,
  ) {
    const {data} = response;
    const weather = data.weather[0];

    return {
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      icon: weather
        ? `http://openweathermap.org/img/wn/${weather.icon}@4x.png`
        : null,
      description: weather?.description ?? null,
      city: data.name,
    };
  }
}

export default WeatherService;
