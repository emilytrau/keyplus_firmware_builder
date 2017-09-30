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
        case 'SET_KEYBOARDCOLLECTION':
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
        default:
            return state
    }
}

export default App;