import { IPricingProvider } from '../clients/pricingProvider';
import { GetPriceResponse } from '../entities/pricing';

export interface IPricingService {
    getPriceByNumberPlate(numberPlate: string, skipCacheForRead?: boolean): Promise<GetPriceResponse>;
}

export class PricingService implements IPricingService {
    private pricingClient: IPricingProvider;

    constructor(pricingClient: IPricingProvider) {
        this.pricingClient = pricingClient;
    }

    async getPriceByNumberPlate(numberPlate: string, skipCacheForRead = true): Promise<GetPriceResponse> {
        const price = await this.pricingClient.getExternalPrice(numberPlate);

        return {
            numberPlate: numberPlate,
            price: price
        };
    }
}
