const { fork } = require('child_process');
const path = require('path');

const processData = (data) => {
    return new Promise((resolve, reject) => {
        const worker = fork(path.join(__dirname, 'worker.js'));
        worker.send(data);

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', (err) => {
            reject(err);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
};

module.exports = processData;
