import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import Select2 from '../src/components/Select2';
import {options} from "./data";
import {Flex} from "@acrool/react-grid";
import {Dropdown} from "../../dist";

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
        options,
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


export const WithHotkeyTab: Story = {
    args: {
        value: 'A',
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

