import {types} from '../types/types';

const initialState = {
    modal: false,
    accountModal: false
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MODAL_DATA:
            return {
                ...state,
                modal: action.payload,
            };
        case types.SET_ACCOUNT_MODAL_DATA:
            return {
                ...state,
                accountModal: action.payload,
            };
        default:
            return state;
    }
}
