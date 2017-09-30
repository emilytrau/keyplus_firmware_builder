export function openDrawer() {
    return {
        type: 'OPEN_DRAWER'
    }
}

export function closeDrawer() {
    return {
        type: 'CLOSE_DRAWER'
    }
}

export function openKLEPasteDialog() {
    return {
        type: 'OPEN_APP_KLEPASTEDIALOG'
    }
}

export function closeKLEPasteDialog() {
    return {
        type: 'CLOSE_APP_KLEPASTEDIALOG'
    }
}

export function setKBCollection(kbcollection) {
    return {
        type: 'SET_KEYBOARDCOLLECTION',
        kbcollection
    }
}

export function showSnackbar(message) {
    return {
        type: 'SHOW_SNACKBAR',
        message
    }
}

export function addKeyboard(keyboard) {
    return {
        type: 'ADD_KEYBOARD',
        keyboard
    }
}