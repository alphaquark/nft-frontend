import { WidgetActions } from './actions';
import { WIDGET_FETCH, WIDGET_DATA, WIDGET_ERROR } from './constants';

export interface WidgetState {
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any;
}

export const initialWidgetState: WidgetState = {
    loading: false,
    success: false,
    error: false,
    data: null,
};

export const widgetReducer = (state = initialWidgetState, action: WidgetActions): WidgetState => {
    switch (action.type) {
        case WIDGET_FETCH:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            };
        case WIDGET_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload,
            };
        case WIDGET_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
            };
        default:
            return state;
    }
};
