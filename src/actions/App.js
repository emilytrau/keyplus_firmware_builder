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

export function updateKeyboard(index, keyboard) {
    return {
        type: 'UPDATE_KEYBOARD',
        index,
        keyboard
    }
}

export function updateKey(keyboardIndex, index, newKey) {
    return {
        type: 'UPDATE_KEY',
        keyboardIndex,
        index,
        newKey
    }
}