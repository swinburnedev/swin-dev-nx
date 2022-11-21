import { render } from '@testing-library/react';

import ContentfulRichText from './contentful-rich-text';

describe('ContentfulRichText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentfulRichText />);
    expect(baseElement).toBeTruthy();
  });
});
