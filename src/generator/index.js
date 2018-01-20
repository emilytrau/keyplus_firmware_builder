import yaml from 'yamljs';
import { getCategory } from './../utils/Keycode.js';
const layerKeys = [].concat(...getCategory('Firmware').slice(0, 4));

export default function generator(kbcollection) {
    return new Promise((resolve, reject) => {
        try {
            let devices = {};
            let layouts = {};
            let keyboardCount = 0;
            kbcollection.firmwareSettings.layoutGroups.forEach((group, groupIndex) => {
                let layout = {
                    default_layer: 0,
                    layers: []
                }
                const keyboards = group.map(uuid => kbcollection.keyboards.find(n => n.uuid === uuid));
                
                let maxLayer = 0;
                keyboards.forEach((keyboard) => {
                    keyboard.layers.forEach((layer) => {
                        layer.forEach((row) => {
                            row.forEach((keycode) => {
                                if (layerKeys.indexOf(keycode) !== -1) {
                                    // Keycode is a layer toggle key
                                    // Get the layer that it is pointing to and see if it is the higherst layer
                                    maxLayer = Math.max(maxLayer, parseInt(keycode.match(/L(\d+)$/)[1]));
                                }
                            });
                        });
                    });
                });

                keyboards.forEach((keyboard, keyboardIndex) => {
                    for (let i = 0; i <= maxLayer; i++) {
                        layout.layers[i] = layout.layers[i] || [];
                        layout.layers[i][keyboardIndex] = [].concat(...keyboard.layers[i]);
                    }

                    let matrix_map = Array(keyboard.matrixRows * keyboard.matrixColumns).fill('____');
                    keyboard.layout.forEach(key => {
                        matrix_map[key.row * keyboard.matrixColumns + key.column] = 'r' + key.row.toString() + 'c' + key.column.toString()
                    });

                    devices[keyboard.name + '_' + keyboard.uuid.slice(0, 4)] = {
                        id: keyboardCount++,
                        layout: 'layout_' + groupIndex.toString(),
                        layout_offset: keyboardIndex,
                        scan_mode: {
                            mode: 'col_row',
                            rows: keyboard.matrixRows,
                            cols: keyboard.matrixColumns,
                            matrix_map
                        }
                    }
                });
                layouts['layout_' + groupIndex.toString()] = layout;
            });

            const data = {
                name: kbcollection.name,
                report_mode: 'auto_nkro',
                version: 0,
                devices,
                layouts
            }
            resolve(yaml.stringify(data, 4));
        } catch(e) {
            reject(e);
        }
    });
}