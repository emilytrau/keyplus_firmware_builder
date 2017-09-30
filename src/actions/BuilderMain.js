export function openSidebarDrawer() {
    return {
        type: 'OPEN_MAIN_SIDEBARDRAWER'
    }
}

export function closeSidebarDrawer() {
    return {
        type: 'CLOSE_MAIN_SIDEBARDRAWER'
    }
}

export function setKeyboard(index) {
    return {
        type: 'SET_SELECTEDKEYBOARD',
        index
    }
}

export function setTab(name) {
    return {
        type: 'SET_SELECTEDTAB',
        name
    }
}

export function openKLEPasteDialog() {
    return {
        type: 'OPEN_MAIN_KLEPASTEDIALOG'
    }
}

export function closeKLEPasteDialog() {
    return {
        type: 'CLOSE_MAIN_KLEPASTEDIALOG'
    }
}