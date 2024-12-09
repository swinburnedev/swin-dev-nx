import type { Meta } from '@storybook/react';
import { BackButton } from './back-button';

const Story: Meta<typeof BackButton> = {
  component: BackButton,
  title: 'BackButton',
};
export default Story;

export const Primary = {
    args: {},
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/qhdA0ZC2UOloC2V7NGHdux/Material-Design-2-web-starter-kit-(Community)?node-id=208-2275&node-type=frame&t=AoXRJObE7MYWjogq-0",
        },
        status: {
            type: "stable", // "beta", "deprecated", "stable", "releaseCandidate"
        },
    },
}
