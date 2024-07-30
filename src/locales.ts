interface ILocale {
    [locale: string]: {
        [key: string]: string,
    }
}

const locales: ILocale = {
    'en-US': {
        'com.dropdown.noData': 'No Data',
    },
    'zh-TW': {
        'com.dropdown.noData': '沒有資料',
    },
    'zh-CN': {
        'com.dropdown.noData': '没有资料',
    },
    'ja-JP': {
        'com.dropdown.noData': 'データなし',
    }
};


const useLocale = (locale?: string) => {
    const i18n = (id: string, options?: {def?: string, args?: any}) => {
        const selectLocale = typeof locale !== 'undefined' ? locale : 'en-US';
        const localeMap = locales[selectLocale] ? locales[selectLocale]: locales['en-US'];

        if(typeof localeMap !== 'undefined' && typeof localeMap[id] !== 'undefined'){
            let resText = localeMap[id];
            if(options?.args){
                Object.keys(options.args).forEach(argKey => {
                    resText = resText.replace(`{${argKey}}`, options.args[argKey]);
                });
            }
            return resText;
        }

        if(typeof options?.def !== 'undefined'){
            return options?.def;
        }

        return id;
    };

    return {i18n};
};

export default useLocale;
