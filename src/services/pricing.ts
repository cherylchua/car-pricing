import { IPricingProvider } from '../clients/pricingProvider';

export interface IPricingService {
    getPriceByNumberPlate(numberPlate: string, skipCacheForRead?: boolean): Promise<number>;
}

export class PricingService implements IPricingService {
    private pricingClient: IPricingProvider;

    constructor(pricingClient: IPricingProvider) {
        this.pricingClient = pricingClient;
    }

    async getPriceByNumberPlate(numberPlate: string, skipCacheForRead = true): Promise<number> {
        return await this.pricingClient.getExternalPrice(numberPlate);
    }
}
