import { RedisClientType } from '@node-redis/client';
import redis from 'redis';

export class RedisHelper {
    public static redisClient: RedisClientType;

    public static init(host: string, port: number) {
        const redisClient = redis.createClient();

        return redisClient;
    }
}
