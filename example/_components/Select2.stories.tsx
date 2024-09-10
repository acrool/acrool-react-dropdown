import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import Select2 from '../src/components/Select2';

const meta = {
    title: 'Example/Select2',
    component: Select2,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof Select2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: 'A',
        options: [
            {text: 'Apple', value: 'A'},
            {text: 'Basic', value: 'B'},
            {text: 'Cat & Car', value: 'C'},
            {text: 'Dog & Desk', value: 'D'},
            {text: 'Element', value: 'E'},
            {text: 'Fake', value: 'F'},
            {text: 'Google', value: 'G'},
        ]
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string) {
            updateArgs({value});
        }
        
        return <Select2
            {...args}
            onChange={onChange}
        />;
    },
};
