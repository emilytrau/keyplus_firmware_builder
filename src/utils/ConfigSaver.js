import FileSaver from 'file-saver';

function ConfigSaver(kbcollection) {
    const blob = new Blob([ JSON.stringify(kbcollection) ], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'config-kb-builder.json');
}

export default ConfigSaver;