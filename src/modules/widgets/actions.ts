import { WIDGET_FETCH, WIDGET_DATA, WIDGET_ERROR } from './constants';

export interface WidgetFetch {
    type: typeof WIDGET_FETCH;
}

export interface WidgetData {
    type: typeof WIDGET_DATA;
    payload: any;
}

export interface WidgetError {
    type: typeof WIDGET_ERROR;
}

export type WidgetActions = WidgetFetch | WidgetData | WidgetError;

export const widgetFetch = (): WidgetActions => ({
    type: WIDGET_FETCH,
});

export const widgetData = (payload: WidgetData['payload']): WidgetActions => ({
    type: WIDGET_DATA,
    payload,
});

export const widgetError = (): WidgetActions => ({
    type: WIDGET_ERROR,
});
