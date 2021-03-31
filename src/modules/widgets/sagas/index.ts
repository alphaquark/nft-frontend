// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';

import { WIDGET_FETCH } from '../constants';
import { widgetFetchSaga } from './widgetFetchSaga';

// eslint-disable-next-line
export function* rootWidgetSaga() {
    yield takeEvery(WIDGET_FETCH, widgetFetchSaga);
}
