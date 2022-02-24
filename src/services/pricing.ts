import { IPricingProvider } from '../clients/pricingProvider';
import { GetPriceResponse } from '../entities/pricing';
import { RedisHelper } from '../utils/redis';

export interface IPricingService {
    getPriceByNumberPlate(numberPlate: string, skipCacheForRead?: boolean): Promise<GetPriceResponse>;
}

export class PricingService implements IPricingService {
    private pricingClient: IPricingProvider;

    constructor(pricingClient: IPricingProvider) {
        this.pricingClient = pricingClient;
    }

    async getPriceByNumberPlate(numberPlate: string, skipCacheForRead = true): Promise<GetPriceResponse> {
        let price: number;

        if (skipCacheForRead) {
            price = await this.getExternalPriceAndStoreInCache(numberPlate);
        } else {
            const redisPrice = RedisHelper.redisClient.get(numberPlate);

            price = Number(redisPrice);

            if (redisPrice === null || 0) {
                price = await this.getExternalPriceAndStoreInCache(numberPlate);
            }
        }

        return {
            numberPlate: numberPlate,
            price: price
        };
    }

    private async getExternalPriceAndStoreInCache(numberPlate: string): Promise<number> {
        const price = await this.pricingClient.getExternalPrice(numberPlate);

        await RedisHelper.redisClient.set(numberPlate, price);

        return price;
    }
}
