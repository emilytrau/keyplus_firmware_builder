// Data structure which represents a key
class Key {
    constructor(data) {
        if (undefined === (data.x && data.y && data.width && data.height && data.x2 && data.y2 && data.w2 && data.h2 && data.row && data.column)) {
            console.log(data);
            throw new Error('Invalid key data');
        }

        // Position data
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        // Position data of second rectangle (eg. for ISO enter)
        this.x2 = data.x2;
        this.y2 = data.y2;
        this.w2 = data.w2;
        this.h2 = data.h2;

        // Matrix data
        this.row = data.row;
        this.column = data.column;
    }
}

export default Key;