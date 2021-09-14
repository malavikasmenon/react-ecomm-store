import { actionType } from "../constants/actiontype_const";

export const setCount = (count) => {
    return {
        type: actionType.SET_CART_COUNT,
        payload: count
    };
};