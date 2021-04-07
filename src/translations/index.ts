import { en } from './en';
import { cn } from './cn';

interface LangType {
    [key: string]: {
        [key: string]: string;
    };
}

export const languageMap: LangType = {
    default: en,
    en,
    cn,
};
