import { render } from '@testing-library/react';

import MobilePreview from './mobile-preview';

describe('MobilePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobilePreview />);
    expect(baseElement).toBeTruthy();
  });
});
