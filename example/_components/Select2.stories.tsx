import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import Select2 from '../src/components/Select2';
import {options} from './data';
import {Flex} from '@acrool/react-grid';

const meta = {
    title: 'Example/Select2',
    component: Select2,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Demonstrate how to use Select2 + Dropdown to complete the function'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onChange: fn(),
        options,
        isSearchEnable: true,
        value: '1',
    },
} satisfies Meta<typeof Select2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
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


export const WithHotkeyTab: Story = {
    args: {
        value: '1',
        options,
        isSearchEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2 align-items-start">
            <input type="text" placeholder="input order 1"/>
            <Select2
                {...args}
                onChange={onChange}
            />
            <input type="text" placeholder="input order 3"/>
        </Flex>;
    },
};

