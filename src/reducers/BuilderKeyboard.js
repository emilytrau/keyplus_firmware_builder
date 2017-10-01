function BuilderKeyboard(state = {
    zoom: 50,
    selectedKeyIndex: -1
}, action) {
    switch(action.type) {
        case 'ZOOM_KEYBOARD_IN':
            return {
                ...state,
                zoom: state.zoom + 10
            }
        case 'ZOOM_KEYBOARD_OUT':
            return {
                ...state,
                zoom: Math.max(state.zoom - 10, 20)
            }
        case 'ZOOM_KEYBOARD_RESET':
            return {
                ...state,
                zoom: 50
            }
        case 'SELECT_KEYBOARD_KEY':
            return {
                ...state,
                selectedKeyIndex: action.index
            }
        default:
            return state;
    }
}

export default BuilderKeyboard;