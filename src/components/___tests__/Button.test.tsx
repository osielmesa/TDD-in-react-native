import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  test('It should render properly', () => {
    const wrapper = render(<Button label={''} onPress={jest.fn()} />);
    wrapper.getByTestId('button');
  });

  test('It should render loader when loading', () => {
    const wrapper = render(
      <Button label={''} onPress={jest.fn()} loading={true} />,
    );
    wrapper.getByTestId('button-loading');
  });

  test('It should given onPress when clicked', () => {
    const mockPress = jest.fn();
    const wrapper = render(<Button label={''} onPress={mockPress} />);
    const button = wrapper.getByTestId('button');
    fireEvent.press(button);
    expect(mockPress).toHaveBeenCalled();
  });

  test('It should render label', () => {
    const wrapper = render(
      <Button label={'button-label'} onPress={jest.fn()} />,
    );
    wrapper.getByText('button-label');
  });

  test('It should accept custom view props', () => {
    const wrapper = render(
      <Button label={''} onPress={jest.fn()} testID={'mock-test-id'} />,
    );
    wrapper.getByTestId('mock-test-id');
  });
});
