function BuilderMain(state = {
    isSidebarDrawerOpen: false,
    selectedKeyboard: 0,
    selectedTab: 'keymap',
    isKLEPasteDialogOpen: false
}, action) {
    switch(action.type) {
        case 'OPEN_MAIN_SIDEBARDRAWER':
            return {
                ...state,
                isSidebarDrawerOpen: true
            }
        case 'CLOSE_MAIN_SIDEBARDRAWER':
            return {
                ...state,
                isSidebarDrawerOpen: false
            }
        case 'SET_SELECTEDKEYBOARD':
            return {
                ...state,
                selectedKeyboard: action.index
            }
        case 'SET_SELECTEDTAB':
            return {
                ...state,
                selectedTab: action.name
            }
        case 'OPEN_MAIN_KLEPASTEDIALOG':
            return {
                ...state,
                isKLEPasteDialogOpen: true
            }
        case 'CLOSE_MAIN_KLEPASTEDIALOG':
            return {
                ...state,
                isKLEPasteDialogOpen: false
            }
        default:
            return state
    }
}

export default BuilderMain;