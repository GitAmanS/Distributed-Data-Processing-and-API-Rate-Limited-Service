const redis = require('../config/redisClient');

const rateLimiter = async (req, res, next) => {
    const rateKey = `rate:${req.ip}`;
    const tasksPerMinuteKey = `tasks:${req.ip}`;
    const currentTime = Date.now();
    
    const requestLimit = 100; 

    
    const existing = await redis.get(rateKey);
    if (existing) {
        return res.status(429).json({ message: 'Too many requests' });
    }
    await redis.set(rateKey, currentTime, 'PX', 1000); 

    await redis.rpush(tasksPerMinuteKey, currentTime);
    await redis.expire(tasksPerMinuteKey, 60); 

    const requestCount = await redis.llen(tasksPerMinuteKey);
    if (requestCount > requestLimit) {
        return res.status(429).json({ message: 'Too many requests' });
    }

    next();
};

module.exports = rateLimiter;
