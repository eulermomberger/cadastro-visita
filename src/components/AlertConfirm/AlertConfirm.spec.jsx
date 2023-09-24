import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import { AlertConfirm } from '.';

describe('AlertConfirm component', () => {
  it('Should appear when the isOpen prop is equal to true', () => {
    const testRenderer = renderer.create(
      <AlertConfirm
        isOpen
        title='Alerta de confirmação'
        description='Descrição para o alerta de confirmação'
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should desappear when the isOpen prop is equal to false', () => {
    const testRenderer = renderer.create(
      <AlertConfirm
        isOpen={false}
        title='Alerta de confirmação'
        description='Descrição para o alerta de confirmação'
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should call the functions prop when clicked', () => {
    const mockCancelFunc = jest.fn();
    const mockConfirmFunc = jest.fn();

    const { getByText } = render(
      <AlertConfirm
        isOpen={true}
        title='Alerta de confirmação'
        description='Descrição para o alerta de confirmação'
        onCancel={mockCancelFunc}
        onConfirm={mockConfirmFunc}
      />
    );

    fireEvent.click(getByText(/Cancelar/i));
    expect(mockCancelFunc).toHaveBeenCalled();

    fireEvent.click(getByText(/Confirmar/i));
    expect(mockConfirmFunc).toHaveBeenCalled();
  });
});
