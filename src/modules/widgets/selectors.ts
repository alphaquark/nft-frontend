import { RootState } from '..';

export const selectWidgets = (state: RootState): any => state.widgets.data;
