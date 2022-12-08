import { render } from '@testing-library/react';
import { Layout } from './layout';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout title='Home'><div>child element</div></Layout>);
    expect(baseElement).toBeTruthy();
  });

  it('should render meta title', () => {
    render(<Layout title='Home'><div>child element</div></Layout>, {
      container: document.head,
    });
    expect(document.title).toBe('Home | Swinburne Dev');
  });
});
