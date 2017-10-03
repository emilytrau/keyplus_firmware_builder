import keycodes from './../config/keycodes.js';

export function getLongLabel(keycode) {
    return keycodes[keycode][0] || keycode;
}

export function getShortLabel(keycode) {
    return keycodes[keycode] ? keycodes[keycode][1] || keycodes[keycode][0] : keycode;
}