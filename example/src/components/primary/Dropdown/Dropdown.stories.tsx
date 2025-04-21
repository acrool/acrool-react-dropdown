import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';

import {Dropdown, TOption} from '@acrool/react-dropdown';
import {Flex} from '@acrool/react-grid';
import {groupOptions, NodeOptions, options, optionsWithHidden} from '../../../config/data';
import {useDarkMode} from 'storybook-dark-mode';

const meta = {
    title: 'Primary/Dropdown',
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
        options,
        value: '2',
        searchTextPlaceholder: 'type input...',
        isSearchEnable: false,
        isAvatarEnable: false,
        isCheckedEnable: true,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [, updateArgs] = useArgs();

        const onChange = (value: string) => updateArgs({value});

        return <Dropdown
            {...args}
            isDark={isDark}
            onEnter={fn(onChange)}
            onClick={fn(onChange)}
        />;
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {
        isAvatarEnable: true,
    },
};

export const WithSearch: Story = {
    args: {
        isSearchEnable: true,
        isAvatarEnable: true,
    },
};

export const WithThemeDiff: Story = {
    args: {
        isAvatarEnable: true,
    },
    render: function Render(args) {
        const [, updateArgs] = useArgs();

        const onChange = (value: string) => updateArgs({value});

        return <Flex className="gap-2">
            <Dropdown
                {...args}
                isDark={false}
                onClick={fn(onChange)}
            />
            <Dropdown
                {...args}
                isDark
                onClick={fn(onChange)}
            />
        </Flex>;
    },
};





export const WithHiddenCheck: Story = {
    args: {
        isCheckedEnable: false,
    },
};


export const WithFilter: Story = {
    args: {
        isSearchEnable: true,
    },
};

export const WithGroup: Story = {
    args: {
        options: groupOptions,
        isAvatarEnable: true,
        isSearchEnable: true,
    },
};

export const WithHidden: Story = {
    args: {
        options: optionsWithHidden,
        isSearchEnable: true,
    },
};

export const WithReverse: Story = {
    args: {
        options: groupOptions,
        isAvatarEnable: true,
        isSearchEnable: true,
        isReverse: true,
    },

};

export const WithHotkeyTab: Story = {
    args: {
        isSearchEnable: true,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [, updateArgs] = useArgs();
        const onChange = (value: string) => updateArgs({value});

        return <Flex className="gap-2 align-items-start">
            <input type="text" placeholder="input order 1"/>
            <Dropdown
                {...args}
                isDark={isDark}
                onEnter={fn(onChange)}
                onClick={fn(onChange)}
            />
            <input type="text" placeholder="input order 3"/>
        </Flex>;
    },
};



export const WithOverScroll: Story = {
    args: {
        options: groupOptions,
        isAvatarEnable: true,
        isSearchEnable: true,
        isReverse: true,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [, updateArgs] = useArgs();
        const onChange = (value: string) => updateArgs({value});

        return <Flex className="gap-2" style={{maxHeight: '250px'}}>
            <Dropdown
                {...args}
                isDark={isDark}
                onEnter={fn(onChange)}
                onClick={fn(onChange)}
            />
        </Flex>;
    },
};


export const WithReactNode: Story = {
    args: {
        options: NodeOptions,
        isAvatarEnable: true,
        isSearchEnable: true,
        isReverse: true,
    },
    render: function Render(args) {
        const isDark = useDarkMode();
        const [, updateArgs] = useArgs();
        const onChange = (value: string) => updateArgs({value});

        return <Flex className="gap-2" style={{maxHeight: '250px'}}>
            <Dropdown
                {...args}
                isDark={isDark}
                onEnter={fn(onChange)}
                onClick={fn(onChange)}
            />
        </Flex>;
    },
};
