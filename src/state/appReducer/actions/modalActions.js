import {types} from '../types/types';

// eslint-disable-next-line react-hooks/rules-of-hooks

export const setModalData = (val) => async dispatch => {
    try {
        dispatch({
            type: types.SET_MODAL_DATA,
            payload: val,
        })
    } catch (e) {
        console.log(e)
    }
};

export const setAccountModalData = (val) => async dispatch => {
    try {
        dispatch({
            type: types.SET_ACCOUNT_MODAL_DATA,
            payload: val,
        })
    } catch (e) {
        console.log(e)
    }
};
