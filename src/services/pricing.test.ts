import { PricingProvider } from '../clients/pricingProvider';
import { PricingService } from './pricing';

describe('PricingService', () => {
    const pricingProvider = new PricingProvider();
    const pricingService = new PricingService(pricingProvider);

    const mockNumberPlate = 'ABC123';

    describe('getPriceByNumberPlate', () => {
        it('should call the 3rd party client to get price by number plate', async () => {
            PricingProvider.prototype.getExternalPrice = jest.fn().mockResolvedValueOnce(15000);

            const res = await pricingService.getPriceByNumberPlate(mockNumberPlate);

            expect(pricingProvider.getExternalPrice).toBeCalledTimes(1);
            expect(pricingProvider.getExternalPrice).toBeCalledWith(mockNumberPlate);
            expect(res).toEqual(15000);
        });
    });
});
