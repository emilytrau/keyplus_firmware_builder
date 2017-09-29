import Keyboard from './Keyboard.js';

// Loads a config from a local file and returns a Keyboard instance
export default function ConfigLoader() {
    return new Promise((resolve, reject) => {
        // Check if File API is available
        if (!(window.File && window.FileReader && window.FileList)) {
            reject('File API not supported');
            return;
        }

        if (document.getElementById('configloader-file-picker')) {
            // Existing file input element exists
            // Remove it
            document.getElementById('configloader-file-picker').remove();
        }

        const fileInput = document.createElement('input');
        fileInput.style.display = 'none';
        fileInput.setAttribute('id', 'configloader-file-picker');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', '.kbconfig, .json');
        document.body.appendChild(fileInput);

        const timeout = setTimeout(() => {
            // Assume dialogue has been cancelled after 5 minutes
            // Reject and clean up
            fileInput.remove();
            reject('Timeout');
        }, 300000);

        fileInput.addEventListener('change', () => {
            // On file selection

            clearTimeout(timeout);

            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                // Parse resulting file as json
                try {
                    let rawjson = JSON.parse(reader.result);
                    resolve(new Keyboard(rawjson));
                } catch(err) {
                    reject(`Invalid config: ${err.message}`);
                } 
            }
            reader.readAsText(file);

            // Delete file input element
            fileInput.remove();
        }, false);
        fileInput.click();
    });
}