import type {IDropdownGroupOption, IDropdownOption, TOption} from './types';
import * as utils from './utils';

describe('utils.ts', () => {
    describe('isGroupOptions', () => {
        it('should return true for group option', () => {
            const group: IDropdownGroupOption<string> = {groupName: 'g', children: []};
            expect(utils.isGroupOptions(group)).toBe(true);
        });
        it('should return false for normal option', () => {
            const opt: IDropdownOption<string> = {value: 'a', text: 'A'};
            expect(utils.isGroupOptions(opt)).toBe(false);
        });
    });

    describe('filterOptions', () => {
        const options: Array<TOption<string>> = [
            {value: 'a', text: 'Apple'},
            {value: 'b', text: 'Banana', searchTags: ['fruit', 'yellow']},
            {groupName: 'Group1', children: [
                {value: 'c', text: 'Carrot'},
            ]},
        ];
        it('should filter by text', () => {
            const result = utils.filterOptions(options, 'apple');
            expect(result).toEqual([
                {value: 'a', text: 'Apple'}
            ]);
        });
        it('should filter by searchTags', () => {
            const result = utils.filterOptions(options, 'yellow');
            expect(result).toEqual([
                {value: 'b', text: 'Banana', searchTags: ['fruit', 'yellow']}
            ]);
        });
        it('should filter group children', () => {
            const result = utils.filterOptions(options, 'carrot');
            expect(result).toEqual([
                {
                    groupName: 'Group1',
                    children: [
                        {value: 'c', text: 'Carrot'}
                    ]
                }
            ]);
        });
        it('should return all if filterKeyword is empty', () => {
            expect(utils.filterOptions(options, '')).toHaveLength(3);
        });
    });

    describe('isEmpty', () => {
        it('should return true for null, undefined, false, 0, empty string, empty object', () => {
            expect(utils.isEmpty(null)).toBe(true);
            expect(utils.isEmpty(undefined)).toBe(true);
            expect(utils.isEmpty(false)).toBe(true);
            expect(utils.isEmpty(0)).toBe(true);
            expect(utils.isEmpty('')).toBe(true);
            expect(utils.isEmpty({})).toBe(true);
        });
        it('should return false for non-empty values', () => {
            expect(utils.isEmpty('abc')).toBe(false);
            expect(utils.isEmpty([1])).toBe(false);
            expect(utils.isEmpty({a: 1})).toBe(false);
            expect(utils.isEmpty(new Date())).toBe(false);
        });
        it('should respect isZero/isFalse options', () => {
            expect(utils.isEmpty(0, {isZero: false})).toBe(false);
            expect(utils.isEmpty(false, {isFalse: false})).toBe(false);
        });
    });

    describe('removeByIndex', () => {
        it('should remove item by index', () => {
            expect(utils.removeByIndex([1, 2, 3], 1)).toEqual([1, 3]);
        });
        it('should return original if index is -1 or out of range', () => {
            expect(utils.removeByIndex([1, 2, 3], -1)).toEqual([1, 2, 3]);
            expect(utils.removeByIndex([1, 2, 3], 10)).toEqual([1, 2, 3]);
        });
    });

    describe('getOptionStyle', () => {
        it('should return correct style with avatarUrl and color', () => {
            expect(utils.getOptionStyle({avatarUrl: 'a.png', color: '#fff'})).toEqual({backgroundImage: 'url(a.png)', backgroundColor: '#fff'});
        });
        it('should return auto backgroundImage if no avatarUrl', () => {
            expect(utils.getOptionStyle({color: '#000'})).toEqual({backgroundImage: 'auto', backgroundColor: '#000'});
        });
    });

    describe('getIndex', () => {
        const options: Array<TOption<string>> = [
            {value: 'a', text: 'A'},
            {groupName: 'G', children: [ {value: 'b', text: 'B'} ]},
        ];
        it('should find index for normal option', () => {
            expect(utils.getIndex(options, 'a')).toEqual({groupIndex: 0, itemIndex: 0});
        });
        it('should find index for group child', () => {
            expect(utils.getIndex(options, 'b')).toEqual({groupIndex: 1, itemIndex: 0});
        });
        it('should return -1 if not found', () => {
            expect(utils.getIndex(options, 'x')).toEqual({groupIndex: -1, itemIndex: -1});
        });
    });

    describe('matchAZ09', () => {
        it('should match a-z, 0-9', () => {
            expect(utils.matchAZ09('abc123')).toBe(true);
            expect(utils.matchAZ09('ABC')).toBe(false);
            expect(utils.matchAZ09('abc-123')).toBe(false);
        });
    });

    // 其餘函數如 getNextIndexValue, getPrevIndexValue, getFirstIndexValue, scrollIntoViewByGroup, checkIsMobile
    // 這些涉及 DOM 操作或複雜結構，僅做簡單 smoke test
    describe('getNextIndexValue', () => {
        it('should get next value in group', () => {
            const options: Array<TOption<number>> = [
                {groupName: 'G', children: [ {value: 1, text: '1'}, {value: 2, text: '2'} ]},
                {value: 3, text: '3'},
            ];
            expect(utils.getNextIndexValue(options, 0, 0)).toBe(2);
            expect(utils.getNextIndexValue(options, 0, 1)).toBe(undefined);
        });
        it('should get next value for last item', () => {
            const options: Array<TOption<number>> = [
                {groupName: 'G', children: [ {value: 1, text: '1'}, {value: 2, text: '2'} ]},
            ];
            expect(utils.getNextIndexValue(options, 0, 1)).toBe(2);
        });
    });
    describe('getPrevIndexValue', () => {
        it('should get prev value in group', () => {
            const options: Array<TOption<number>> = [
                {value: 1, text: '1'},
                {groupName: 'G', children: [ {value: 2, text: '2'}, {value: 3, text: '3'} ]},
            ];
            expect(utils.getPrevIndexValue(options, 1, 1)).toBe(2);
            expect(utils.getPrevIndexValue(options, 1, 0)).toBe(1);
        });
    });
    describe('getFirstIndexValue', () => {
        it('should get first value', () => {
            const options: Array<TOption<number>> = [
                {value: 1, text: '1'},
                {groupName: 'G', children: [ {value: 2, text: '2'} ]},
            ];
            expect(utils.getFirstIndexValue(options)).toBe(1);
            expect(utils.getFirstIndexValue([{groupName: 'G', children: [ {value: 2, text: '2'} ]}])).toBe(2);
        });
    });
    describe('checkIsMobile', () => {
        it('should return boolean', () => {
            expect(typeof utils.checkIsMobile()).toBe('boolean');
        });
    });
});
