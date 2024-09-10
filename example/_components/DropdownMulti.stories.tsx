import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {DropdownMulti, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {groupOptions, options} from "./data";

const meta = {
    title: 'Components/DropdownMulti',
    component: DropdownMulti,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof DropdownMulti>;

export default meta;
type Story = StoryObj<typeof meta>;






export const Primary: Story = {
    args: {
        value: ['A', 'B'],
        options,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <DropdownMulti
                {...args}
                onClick={onChange}
            />
            <DropdownMulti
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};

export const Avatar: Story = {
    args: {
        value: ['A', 'B'],
        options,
        isAvatarEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <DropdownMulti
                {...args}
                onClick={onChange}
            />
            <DropdownMulti
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};





export const NonCheck: Story = {
    args: {
        value: ['A', 'B'],
        options,
        isCheckedEnable: false,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <DropdownMulti
                {...args}
                onClick={onChange}
            />
            <DropdownMulti
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};


export const Filter: Story = {
    args: {
        value: ['A', 'B'],
        options,
        isSearchEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <DropdownMulti
                {...args}
                onClick={onChange}
            />
            <DropdownMulti
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};



export const Group: Story = {
    args: {
        value: ['A', 'B'],
        options: groupOptions,
        isSearchEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <DropdownMulti
                {...args}
                onClick={onChange}
            />
            <DropdownMulti
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};

