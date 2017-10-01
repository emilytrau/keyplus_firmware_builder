import Keyboard from './Keyboard.js';
import config from './../config.js';

// Data structure to store multiple keyboards
class KBCollection {
    constructor(data) {
        // TODO: implement a more robust schema validation technique
        if (data.majorVersion !== config.SchemaMajorVersion) {
            throw new Error('Configuration is incompatible with this version of the builder');
        }
        if ((data.name && data.minorVersion && data.keyboards) === undefined) {
            throw new Error('Invalid collection data');
        }

        this.name = data.name;
        this.majorVersion = data.majorVersion;
        this.minorVersion = data.minorVersion;
        this.keyboards = data.keyboards.map(kbData => new Keyboard(kbData));
    }
}

export default KBCollection;