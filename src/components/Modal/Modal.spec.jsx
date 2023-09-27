import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import { Modal } from '.';

const mockAddDocFunc = jest.fn();

jest.mock('firebase/firestore/lite', () => {
  return {
    addDoc() {
      mockAddDocFunc();
      return null;
    },
    collection() {
      return null;
    },
    deleteDoc() {},
    doc() { return null; },
    getDoc() {
      return {
        data() {
          return {
            name: 'Luis',
            rg: '0192839382',
            updated_at: {
              toDate() { return new Date('2023-09-24'); },
            },
          };
        },
        uuid: 'abcd123',
      };
    },
    serverTimestamp() { return new Date('2023-09-24'); },
    updateDoc() {},
    getFirestore() {},
  };
});

describe('Modal component', () => {
  it('Should renders correctly', () => {
    const testRenderer = renderer.create(
      <Modal
        isOpen
        onClose={() => {}}
        setVisitors={() => {}}
        title='Título modal'
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should not render', () => {
    const testRenderer = renderer.create(
      <Modal
        isOpen={false}
        onClose={() => {}}
        setVisitors={() => {}}
        title='Título modal'
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should create when visitorUuid prop is null', () => {
    const { getByText, getByTestId } = render(
      <Modal
        isOpen
        onClose={() => {}}
        setVisitors={() => {}}
        visitors={[]}
        title='Título modal'
      />
    );

    fireEvent.change(getByTestId(/name-input/i), { target: { value: 'João' } });
    fireEvent.change(getByTestId(/rg-input/i), { target: { value: '0123456789' } });
    fireEvent.change(getByTestId(/cpf-input/i), { target: { value: '01201201201' } });
    fireEvent.change(getByTestId(/phone-input/i), { target: { value: '51 998565215' } });
    fireEvent.change(getByTestId(/gender-select/i), { target: { value: 'M' } });
    fireEvent.change(getByTestId(/relation-select/i), { target: { value: 'parente' } });
    fireEvent.change(getByTestId(/permission-select/i), { target: { value: 1 } });

    fireEvent.click(getByText(/Salvar/i));

    expect(mockAddDocFunc).toHaveBeenCalled();
  });
});
