// tslint:disable-next-line
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { widgetData, widgetError } from '../actions';

// eslint-disable-next-line
export function* widgetFetchSaga() {
    try {
        const getWidget = () =>
            axios.get(
                'https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=7460&convert_id=1,2781,2781'
            );
        const getMarquee = () =>
            axios.get(
                'https://3rdparty-apis.coinmarketcap.com/v1/cryptocurrency/widget?id=1,1027,825,7460&convert_id=2781'
            );
        const { data: widget } = yield call(getWidget);
        const { data: marquee } = yield call(getMarquee);

        yield put(
            widgetData({
                data: {
                    widget: Object.values(widget.data),
                    marquee: Object.values(marquee.data),
                },
                timeStamp: widget.status.timestamp,
            })
        );
    } catch (error) {
        yield put(widgetError());
    }
}
