import React, {ElementType, ReactElement} from 'react';
import {createStore} from 'redux';
import {render, RenderOptions} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import rootReducer from '../store/reducers';

const store = createStore(rootReducer);

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({children}: {children: ElementType}) => {
    return <Provider store={options.store || store}>{children}</Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store: theStore, ...others} = options;

  return render(ui, {
    wrapper: AllTheProviders({store: theStore}) as React.ComponentType,
    ...others,
  });
};

export * from '@testing-library/react-native';

export {customRender as render};
