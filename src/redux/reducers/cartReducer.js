import { actionType } from "../constants/actiontype_const";

const initialState = {
    cart_count: 0
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_CART_COUNT:
            return {...state, cart_count: payload };
        default:
            return state;
    }
};