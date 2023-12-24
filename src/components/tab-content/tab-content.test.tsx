import {render, screen} from '@testing-library/react';
import TabContent from './tab-content.tsx';

describe('TabContent', () => {
  it('should render correct', () => {
    render(
      <TabContent id={'overview'} activeTab={'overview'}>
        <>
          <div>Hello</div>
          <div>World</div>
        </>
      </TabContent>
    );

    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/World/i)).toBeInTheDocument();
  });

  it('should return null', () => {
    render(
      <TabContent id={'overview'} activeTab={'details'}>
        <>
          <div>Hello</div>
          <div>World</div>
        </>
      </TabContent>
    );

    expect(screen.queryByText(/Hello/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/World/i)).not.toBeInTheDocument();
  });
});
