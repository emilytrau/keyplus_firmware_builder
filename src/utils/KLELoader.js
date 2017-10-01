import JSON5 from 'json5';
import KBCollection from './KBCollection.js';
import config from './../config.js';

// Creates a Promise<Keyboard> instance from KLE raw data
function KLELoader(kleData) {
    return new Promise((resolve, reject) => {
        let collection;
        try {
            let layout = [];
            const kle = JSON5.parse('[' + kleData.trim() + ']');
            
            if (!Array.isArray(kle[0])) {
                kle.shift();
            }

            let x = 0;
            let y = 0;
            let rowCount = 0;
            let columnCount = 0;
            // Non persistent values
            let width = 1;
            let height = 1;
            let x2 = 0;
            let y2 = 0;
            let w2 = 0;
            let h2 = 0;
            let decal = false;

            kle.forEach((row) => {
                x = 0;
                columnCount = 0;

                row.forEach((column) => {
                    if (column instanceof Object) {
                        // Item is a modifier instead of key data
                        const mod = column;
                        x += mod.x || 0;
                        y += mod.y || 0;
                        width = mod.w || width;
                        height = mod.h || height;
                        x2 = mod.x2 || x2;
                        y2 = mod.y2 || y2;
                        w2 = mod.w2 || width;
                        h2 = mod.h2 || height;
                        decal = mod.d !== undefined ? mod.d : decal;
                        return;
                    }

                    if (!decal) {
                        layout.push({
                            x,
                            y,
                            width,
                            height,
                            x2,
                            y2,
                            w2,
                            h2,
                            row: rowCount,
                            column: columnCount
                        });
                    }

                    x += width;
                    columnCount++;
                    // Reset values that only apply to this key
                    width = 1;
                    height = 1;
                    x2 = 0;
                    y2 = 0;
                    w2 = 0;
                    h2 = 0;
                    decal = false;
                });

                y++;
                rowCount++;
            });

            let layers = [];
            for (let r = 0; r < rowCount + 1; r++) {
                layers[r] = [];
                for (let c = 0; c < columnCount + 1; c++) {
                    layers[r][c] = 'NONE';
                }
            }

            collection = new KBCollection({
                name: 'Untitled collection',
                majorVersion: config.SchemaMajorVersion,
                minorVersion: config.SchemaMinorVersion,
                keyboards: [
                    {
                        name: 'Untitled keyboard',
                        layout,
                        matrixRows: rowCount + 1,
                        matrixColumns: columnCount + 1,
                        layers
                    }
                ]
            });
        } catch(err) {
            reject(err.message);
        }
        resolve(collection);
    });
}

export default KLELoader;