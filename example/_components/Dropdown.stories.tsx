import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Dropdown, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';

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


const options: TOption<string>[] = [
    {text: 'Apple', value: 'A'},
    {text: 'Basic', value: 'B'},
    {text: 'Cat & Car', value: 'C'},
    {text: 'Dog & Desk', value: 'D'},
    {text: 'Element', value: 'E'},
    {text: 'Firefox', value: 'F'},
    {text: 'Google', value: 'G'},
];


const groupOptions: TOption<string>[] = [
    {text: 'Apple', value: 'A'},
    {text: 'Basic', value: 'B'},
    {
        groupName: 'Item',
        children: [
            {text: 'Cat & Car', value: 'C'},
            {text: 'Dog & Desk', value: 'D'},
        ]
    },
    {text: 'Element', value: 'E'},
    {
        groupName: 'Chrome',
        children: [
            {text: 'Firefox', value: 'F'},
            {text: 'Google', value: 'G'},
        ]
    },
    {
        groupName: 'None Children',
        children: []
    },
];

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
