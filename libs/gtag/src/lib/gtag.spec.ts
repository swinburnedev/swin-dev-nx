import { GA_TRACKING_ID } from './gtag';

describe('gtag', () => {
  it('GA_TRACKING_ID should match GA4 ID', () => {
    expect(GA_TRACKING_ID).toEqual('G-9D4NPDBMN5');
  });
});
