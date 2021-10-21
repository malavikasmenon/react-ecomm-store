import { actionType } from "../constants/actiontype_const";

export const setCount = (count) => {
    return {
        type: actionType.SET_CART_COUNT,
        payload: count
    };
};

export const setItem = (item) => {
    return {
        type: actionType.SET_CART_ITEM,
        payload: item
    }
}

export const removeCartItem = (newCartItems) => {
    return {
        type: "REMOVE_CART_ITEM",
        payload: newCartItems
    }
}