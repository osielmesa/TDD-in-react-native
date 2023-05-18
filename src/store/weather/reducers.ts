import {Actions, ActionsTypes} from './actions';
import Status from '../../types/Status';
import {nullWeather, WeatherType} from '../../types/Weather';

export type State = {
  status: Status;
  error: string;
  weather: WeatherType;
};

const initialState: State = {
  weather: nullWeather,
  status: Status.START,
  error: '',
};

export default function (
  state = initialState,
  action: ActionsTypes | {type: '@@INIT'},
): State {
  switch (action.type) {
    case Actions.START:
      return {
        ...state,
        status: Status.LOADING,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        weather: action.payload.weather,
      };
    case Actions.FAILURE:
      return {
        ...state,
        status: Status.FAILURE,
        error: action.payload.error,
      };
    case Actions.RESET:
      return initialState;
    default:
      return state;
  }
}
