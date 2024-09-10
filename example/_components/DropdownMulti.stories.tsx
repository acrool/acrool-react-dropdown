import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {DropdownMulti, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {groupOptions, options} from './data';

const meta = {
    title: 'Components/DropdownMulti',
    component: DropdownMulti,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Drop-down menu with rich functions, including search/groups options/avatar/multi for Reactjs'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onClick: fn(),
        value: ['A', 'B'],
        options,
        searchTextPlaceholder: 'type input...',
        isSearchEnable: false,
        isAvatarEnable: false,
        isCheckedEnable: true,
        isDark: true,
    },
} satisfies Meta<typeof DropdownMulti>;

export default meta;
type Story = StoryObj<typeof meta>;






export const Primary: Story = {
    args: {
        isSearchEnable: true,
        isAvatarEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string[]) {
            updateArgs({value});
        }

        return <DropdownMulti
            isDark
            {...args}
            onClick={onChange}
        />;
    },
};

export const WithAvatar: Story = {
    args: {
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





export const WithHiddenCheck: Story = {
    args: {
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


export const WithFilter: Story = {
    args: {
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



export const WithGroup: Story = {
    args: {
        options: groupOptions,
        isAvatarEnable: true,
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

