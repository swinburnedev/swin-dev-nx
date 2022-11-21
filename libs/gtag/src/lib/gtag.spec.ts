import { GA_TRACKING_ID } from './gtag';

describe('gtag', () => {
  it('GA_TRACKING_ID should match UA ID', () => {
    expect(GA_TRACKING_ID).toEqual('UA-163471005-1');
  });
});
