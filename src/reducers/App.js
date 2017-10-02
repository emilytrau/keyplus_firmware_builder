function App(state = {
    isDrawerOpen: false,
    isKLEPasteDialogOpen: false,
    snackbarMessage: '',
    kbcollection: null
}, action) {
    switch(action.type) {
        case 'OPEN_DRAWER':
            return {
                ...state,
                isDrawerOpen: true
            }
        case 'CLOSE_DRAWER':
            return {
                ...state,
                isDrawerOpen: false
            }
        case 'OPEN_APP_KLEPASTEDIALOG':
            return {
                ...state,
                isKLEPasteDialogOpen: true
            }
        case 'CLOSE_APP_KLEPASTEDIALOG':
            return {
                ...state,
                isKLEPasteDialogOpen: false
            }
        case 'UPDATE_KEYBOARDCOLLECTION':
            return {
                ...state,
                kbcollection: action.kbcollection
            }
        case 'SHOW_SNACKBAR':
            return {
                ...state,
                snackbarMessage: action.message
            }
        case 'ADD_KEYBOARD':
            return {
                ...state,
                kbcollection: {
                    ...state.kbcollection,
                    keyboards: [
                        ...state.kbcollection.keyboards,
                        action.keyboard
                    ]
                }
            }
        case 'UPDATE_KEYBOARD':
            return {
                ...state,
                kbcollection: {
                    ...state.kbcollection,
                    keyboards: state.kbcollection.keyboards.map((keyboard) => {
                        if (keyboard === action.oldKeyboard) {
                            return action.newKeyboard;
                        }
                        return keyboard;
                    })
                }
            }
        case 'UPDATE_KEY':
            return {
                ...state,
                kbcollection: {
                    ...state.kbcollection,
                    keyboards: state.kbcollection.keyboards.map((keyboard, index) => {
                        if (action.keyboardIndex === index) {
                            return {
                                ...keyboard,
                                layout: keyboard.layout.map((key, keyIndex) => {
                                    if (action.index === keyIndex) {
                                        return action.newKey;
                                    }
                                    return key;
                                })
                            }
                        }
                        return keyboard;
                    })
                }
            }
        default:
            return state
    }
}

export default App;