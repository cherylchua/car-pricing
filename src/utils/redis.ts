import { RedisClientType } from '@node-redis/client';
import redis from 'redis';
import { CustomError, ErrorCodes } from './error';

export class RedisHelper {
    public static redisClient: RedisClientType;

    public static async initConnection(redisURL: string): Promise<void> {
        RedisHelper.redisClient = redis.createClient({
            url: redisURL
        });

        await RedisHelper.redisClient.connect();
    }

    public static async closeConnection(): Promise<void> {
        const [ping, get, quit] = await Promise.all([
            RedisHelper.redisClient.ping(),
            RedisHelper.redisClient.get('key'),
            RedisHelper.redisClient.quit()
        ]);

        try {
            const keyValue = await RedisHelper.redisClient.get('key');

            if (keyValue) {
                throw new CustomError(ErrorCodes.REDIS_CLOSE_CONNECTION_ERROR, 'Redis connection not closed', {
                    key: keyValue
                });
            }
        } catch (err) {
            return;
        }
    }
}
