import Key from './Key.js';

// Data structure which represents a keyboard
export default class Keyboard {
    constructor(config) {
        // TODO: implement a more robust schema validation technique
        if (!(config.keys)) {
            throw new Error('Invalid keyboard config');
        }

        this.keys = config.keys.map(keyData => new Key(keyData));
    }
}