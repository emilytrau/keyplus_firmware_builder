import keycodes from './../config/keycodes.js';

const categoryNames = Object.keys(keycodes);
let allKeycodes = {};
categoryNames.forEach((categoryName) => {
    keycodes[categoryName].forEach((subcategory) => {
        Object.keys(subcategory).forEach((keycode) => {
            allKeycodes[keycode] = subcategory[keycode];
        });
    });
});
const keycodeKeys = Object.keys(allKeycodes);

export function getLongLabel(keycode) {
    return allKeycodes[keycode][0] || keycode;
}

export function getShortLabel(keycode) {
    return allKeycodes[keycode] ? allKeycodes[keycode][1] || allKeycodes[keycode][0] : keycode;
}

export function lookupKeycode(_name) {
    const name = _name.toLowerCase();
    return keycodeKeys.find((keycodeKey) => {
        // Check if keycode values contain 'name'
        return allKeycodes[keycodeKey].find(alias => alias.toLowerCase() === name);
    });
}

export function searchKeycode(_name) {
    const name = _name.toLowerCase();
    return keycodeKeys.filter((keycodeKey) => {
        // Check if keycode values contain 'name'
        return allKeycodes[keycodeKey].find(alias => alias.toLowerCase().indexOf(name) !== -1);
    });
}

export function getCategoryNames() {
    return categoryNames;
}

export function getCategory(category) {
    return keycodes[category].map((subcategory) => {
        return Object.keys(subcategory);
    });
}