import renderer from 'react-test-renderer';

import { VisitorsList } from '.';

describe('VisitorsList component', () => {
  it('Should renders correctly with a visitor', () => {
    const testRenderer = renderer.create(
      <VisitorsList
        openModal={() => {}}
        visitors={[{
          name: 'Luis',
          rg: '0124656565',
          updated_at: { toDate() { return new Date() } },
          uuid: 'abcd1234',
        }]}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });

  it('Should renders correctly with no visitors', () => {
    const testRenderer = renderer.create(
      <VisitorsList
        openModal={() => {}}
        visitors={[]}
      />
    );

    try {
      expect(testRenderer.toJSON()).toMatchSnapshot();
    } finally {
      testRenderer.unmount();
    }
  });
});
