import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from './navbar';

export default {
  component: Navbar,
  title: 'Navbar',
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => {
  return (
    <Navbar {...args} />
  )
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Im a card',
  url: 'https://google.com'
};
