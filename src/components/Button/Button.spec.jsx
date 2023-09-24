import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import { Button } from '.';

describe('Button component', () => {
  it('Should appear with the correct background color', () => {
    const testRenderer = renderer.create(
      <Button
        title='Botão'
        backgroundColor='#064482'
        onClick={() => {}}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should appear with the default background color', () => {
    const testRenderer = renderer.create(
      <Button
        title='Botão'
        onClick={() => {}}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should call the function prop when clicked', () => {
    const mockFunc = jest.fn();

    const { getByText } = render(
      <Button
        title='Botão'
        backgroundColor='#064482'
        onClick={mockFunc}
      />
    );

    fireEvent.click(getByText(/Botão/i));

    expect(mockFunc).toHaveBeenCalled();
  });
});
