import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createInstance,
  createPollingProjectConfigManager,
  createBatchEventProcessor,
} from '@optimizely/optimizely-sdk';

const sdkKey = process.env.OPTIMIZELY_SDK_KEY as string;
const client = createInstance({
  projectConfigManager: createPollingProjectConfigManager({ sdkKey }),
  eventProcessor: createBatchEventProcessor(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.onReady();

  const showCV = client.isFeatureEnabled(
    'show_cv',
    req.cookies.userId || 'anon'
  );

  res.json({ showCV });
}
