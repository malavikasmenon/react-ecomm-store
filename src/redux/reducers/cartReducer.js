import { actionType } from "../constants/actiontype_const";

const initialState = {
    cart_count: 0,
    cart_items: []
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.SET_CART_COUNT:
            console.log("called count")
            return {...state, cart_count: payload };
        case actionType.SET_CART_ITEM:
            console.log("payload", payload);
            return {...state, cart_items: state.cart_items.concat(payload) };
        case "REMOVE_CART_ITEM":
            return {...state, cart_items: payload };
        default:
            return state;
    }
};