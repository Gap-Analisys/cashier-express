import Redis from 'ioredis';
const redisClient = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
);

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

const connectRedis = async () => {
  redisClient.on('connect', () => {
    console.log('Redis connected successfully');
  });
};

export { redisClient, connectRedis };
