import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Dropdown, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {groupOptions, options} from './data';

const meta = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Drop-down menu with rich functions, including search/groups options/avatar for Reactjs'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onClick: fn(),
        options,
        value: '2',
        searchTextPlaceholder: 'type input...',
        isSearchEnable: false,
        isAvatarEnable: false,
        isCheckedEnable: true,
        isDark: true,
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
        isSearchEnable: true,
        isAvatarEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string) {
            updateArgs({value});
        }

        return  <Dropdown
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

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <Dropdown
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

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <Dropdown
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

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <Dropdown
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

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2">
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <Dropdown
                isDark
                {...args}
                onClick={onChange}
            />
        </Flex>;
    },
};

export const WithHotkeyTab: Story = {
    args: {
        isSearchEnable: true,
    },
    render: function Render(args) {
        const [{value}, updateArgs] = useArgs();

        function onChange(value: string) {
            updateArgs({value});
        }

        return <Flex className="gap-2 align-items-start">
            <input type="text" placeholder="input order 1"/>
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <input type="text" placeholder="input order 3"/>
        </Flex>;
    },
};
