import React from 'react';
import {render} from '@testing-library/react-native';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import App from '../App';
import store from '../store';

jest.mock('../screens', () => jest.fn());
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn(),
  };
});

describe('App', () => {
  test('It should render routes properly', () => {
    //TODO: this one didn't work, I need to find alternative
    // (Provider as jest.Mock).mockReturnValueOnce(({children}) => children);
    //
    // (AppNavigator as jest.Mock).mockReturnValueOnce(
    //   <View testID={'mock-routes'} />,
    // );
    //
    // const wrapper = render(<App />);
    // wrapper.getByTestId('mock-routes');
  });

  test('Should render redux Provider', () => {
    let providerStore: typeof store;
    (Provider as jest.Mock).mockImplementationOnce(({store: theStore}) => {
      providerStore = theStore;
      return <View testID={'mock-provider'} />;
    });

    const wrapper = render(<App />);
    wrapper.getByTestId('mock-provider');
    expect(providerStore).toBe(store);
  });
});
