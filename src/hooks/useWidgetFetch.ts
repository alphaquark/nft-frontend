import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectWidgets, widgetFetch } from '../modules';

export const useWidgetFetch = (): void => {
    const shouldDispatch = useSelector(selectWidgets);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!shouldDispatch) {
            dispatch(widgetFetch());
        }
    }, [dispatch, shouldDispatch]);
};
