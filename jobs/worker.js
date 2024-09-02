process.on('message', (data) => {
    // Simulate heavy computation
    const result = heavyComputation(data);
    process.send(result);
});

const heavyComputation = (data) => {
    // Perform heavy computation here
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }
    return { sum, data };
};
