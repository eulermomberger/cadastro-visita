import renderer from 'react-test-renderer';

import { SearchInput } from '.';

jest.mock('firebase/firestore/lite', () => {
  return {
    collection() {
      return null;
    },
    getDocs() {
      return {
        docs: [{
          data() {
            return { name: 'Luis', rg: '0192839382', updated_at: { toDate() { return new Date() } } }
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

describe('SearchInput component', () => {
  it('Should renders correctly', () => {
    const testRenderer = renderer.create(
      <SearchInput
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
