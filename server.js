const express = require('express');
const cluster = require('cluster');
const os = require('os');
const routes = require('./routes');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = express();

    app.use(express.json());

    // Routes
    app.use('/api', routes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker process ${process.pid} is listening on port ${PORT}`);
    });
}
