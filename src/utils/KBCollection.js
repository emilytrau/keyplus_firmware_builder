import Keyboard from './Keyboard.js';
import schemaConfig from './../config/schema.js';

// Data structure to store multiple keyboards
class KBCollection {
    constructor(data) {
        // TODO: implement a more robust schema validation technique
        if (data.majorVersion !== schemaConfig.SchemaMajorVersion) {
            throw new Error('Configuration is incompatible with this version of the builder');
        }
        if ((data.uuid && data.name && data.minorVersion && data.keyboards && data.firmwareSettings) === undefined) {
            throw new Error('Invalid collection data');
        }

        this.uuid = data.uuid;
        this.name = data.name;
        this.majorVersion = data.majorVersion;
        this.minorVersion = data.minorVersion;
        this.keyboards = data.keyboards.map(kbData => new Keyboard(kbData));
        this.firmwareSettings = data.firmwareSettings;
    }
}

export default KBCollection;