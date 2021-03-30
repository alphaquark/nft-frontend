import { RootState } from '..';
import { LanguageState } from './reducer';

export const selectCurrentLanguage = (state: RootState): LanguageState['lang'] => state.i18n.lang;
