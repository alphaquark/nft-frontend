import { useEffect, useRef } from 'react';

/* eslint-disable */
export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};
