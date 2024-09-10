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
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
        value: 'A',
        options,
        searchTextPlaceholder: 'type input...',
        isSearchEnable: false,
        isAvatarEnable: false,
        isCheckedEnable: true,
        isDark: true,
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

export const Avatar: Story = {
    args: {
        value: 'A',
        options,
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





export const NonCheck: Story = {
    args: {
        value: 'A',
        options,
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


export const Filter: Story = {
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

export const Group: Story = {
    args: {
        value: 'A',
        options: groupOptions,
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
            <Dropdown
                {...args}
                onClick={onChange}
            />
            <input type="text" placeholder="input order 3"/>
        </Flex>;
    },
};
