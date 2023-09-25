import renderer from 'react-test-renderer';

import { Header } from '.';

jest.mock('firebase/firestore/lite', () => {
  return {
    collection() {
      return null;
    },
    getDocs() {
      return {
        docs: [{
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
        }],
      };
    },
    orderBy() {},
    query() {},
    where() {},
    getFirestore() {},
  };
});

describe('Header component', () => {
  it('Should renders correctly', () => {
    const testRenderer = renderer.create(
      <Header
        openModal={() => {}}
        setVisitors={() => {}}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });
});
