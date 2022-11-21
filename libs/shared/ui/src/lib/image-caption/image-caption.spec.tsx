import { render } from '@testing-library/react';

import ImageCaption from './image-caption';

describe('ImageCaption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImageCaption />);
    expect(baseElement).toBeTruthy();
  });
});
