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

export function updateKBCollection(kbcollection) {
    return {
        type: 'UPDATE_KEYBOARDCOLLECTION',
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

export function updateKeyboard(oldKeyboard, newKeyboard) {
    return {
        type: 'UPDATE_KEYBOARD',
        oldKeyboard,
        newKeyboard
    }
}