import { END_MENU_TRANSITION, TOGGLE_MENU_STATE, TOGGLE_MENU_TRANSITION } from "./types";

export const toggleMenuState = () => {
    return {
        type: TOGGLE_MENU_STATE,
    }
}

export const endMenuTransition = () => {
    return {
        type: END_MENU_TRANSITION,
    }
}

export const toggleMenuTransition = () => {
    return {
        type: TOGGLE_MENU_TRANSITION,
    }
}

export function toggleMenuAndTransition() {
    return (dispatch) => {
            dispatch( toggleMenuTransition())
            dispatch( toggleMenuState())
    }
}