import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory} from '../../mocks/mock-component.tsx';
import TabNavItem from './tab-nav-item.tsx';

describe('TabNavItem', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(
      <TabNavItem
        id={'1'}
        title={'overview'}
        activeTab={'overview'}
        setActiveTab={vi.fn}
      />
    );

    render(preparedComponent);

    expect(screen.getByText('overview')).toBeInTheDocument();
  });
});
