import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWidgets, widgetFetch } from '../modules';

export const useWidgetFetch = () => {
    const shouldDispatch = useSelector(selectWidgets);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!shouldDispatch) {
            dispatch(widgetFetch());
        }
    }, [dispatch, shouldDispatch]);
};
