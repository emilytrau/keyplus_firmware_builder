// Data structure which represents a key
class Key {
    constructor(config) {
        if (!(config.x && config.y && config.width && config.height && config.x2 && config.y2 && config.w2 && config.h2 && config.row && config.column)) {
            throw new Error('Invalid key config');
        }

        // Position data
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        // Position data of second rectangle (eg. for ISO enter)
        this.x2 = config.x2;
        this.y2 = config.y2;
        this.w2 = config.w2;
        this.h2 = config.h2;

        // Matrix data
        this.row = config.row;
        this.column = config.column;
    }
}

export default Key;