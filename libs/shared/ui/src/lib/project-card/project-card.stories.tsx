import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProjectCard } from './project-card';

export default {
  component: ProjectCard,
  title: 'ProjectCard',
} as ComponentMeta<typeof ProjectCard>;

const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
