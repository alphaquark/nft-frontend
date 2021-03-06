import { ChangeLanguageAction } from './actions';
import { CHANGE_LANGUAGE } from './constants';

export interface LanguageState {
    lang: string;
}

const defaultLanguage = {
    code: 'cn',
};

const currentLang: string = localStorage.getItem('lang_type') || defaultLanguage.code;

export const initialChangeLanguageState: LanguageState = {
    lang: currentLang,
};

export const changeLanguageReducer = (
    state = initialChangeLanguageState,
    action: ChangeLanguageAction
): LanguageState => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('lang_type', action.payload);

            return {
                lang: action.payload,
            };
        default:
            return state;
    }
};
