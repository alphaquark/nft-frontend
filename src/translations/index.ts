import { en } from './en';
import { zh } from './zh';

interface LangType {
    [key: string]: {
        [key: string]: string;
    };
}

export const languageMap: LangType = {
    default: en,
    en,
    zh,
};
