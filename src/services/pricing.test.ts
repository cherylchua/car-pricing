import { PricingProvider } from '../clients/pricingProvider';
import { PricingService } from './pricing';

describe('PricingService', () => {
    const mockPricingProvider = new PricingProvider();
    const mockPricingService = new PricingService(mockPricingProvider);

    const mockNumberPlate = 'ABC123';

    describe('getPriceByNumberPlate', () => {
        it('should call the 3rd party client to get price by number plate', async () => {
            PricingProvider.prototype.getExternalPrice = jest.fn().mockResolvedValueOnce(15000);

            const res = await mockPricingService.getPriceByNumberPlate(mockNumberPlate);

            expect(mockPricingProvider.getExternalPrice).toBeCalledTimes(1);
            expect(mockPricingProvider.getExternalPrice).toBeCalledWith(mockNumberPlate);
            expect(res).toEqual(15000);
        });
    });
});
