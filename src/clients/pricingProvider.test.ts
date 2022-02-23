import axios, { AxiosError } from 'axios';
import { CustomError, ErrorCodes } from '../utils/error';
import { PricingProvider } from './pricingProvider';

jest.mock('axios');

beforeEach(() => {
    jest.resetAllMocks();
});

describe('PricingProvider', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    describe('getExternalPrice', () => {
        const mockNumberPlate = 'ABC123';

        const mockPricingProvider = new PricingProvider();

        it('should return price as a number', async () => {
            const mockAxiosReturnValue = {
                data: {
                    price: 20000
                }
            };
            mockedAxios.request.mockResolvedValueOnce(mockAxiosReturnValue);

            const res = await mockPricingProvider.getExternalPrice(mockNumberPlate);
            expect(mockedAxios.request).toHaveBeenCalledTimes(1);
            expect(res).toEqual(20000);
        });

        it('should throw PRICING_PROVIDER_ERROR custom error if price is not a number', async () => {
            try {
                const mockAxiosReturnValue = {
                    data: {
                        price: 'not a number'
                    }
                };
                mockedAxios.request.mockResolvedValueOnce(mockAxiosReturnValue);

                const res = await mockPricingProvider.getExternalPrice(mockNumberPlate);
            } catch (err: any) {
                expect(mockedAxios.request).toHaveBeenCalledTimes(1);
                expect(err).toBeInstanceOf(CustomError);
                expect(err.error_code).toEqual(ErrorCodes.PRICING_PROVIDER_ERROR);
            }
        });

        it('should throw PRICING_PROVIDER_ERROR custom error if an axios error is thrown', async () => {
            try {
                const mockAxiosReturnValue = {
                    code: '400',
                    isAxiosError: true
                } as AxiosError;

                mockedAxios.request.mockRejectedValueOnce(mockAxiosReturnValue);

                const res = await mockPricingProvider.getExternalPrice(mockNumberPlate);
            } catch (err: any) {
                expect(mockedAxios.request).toHaveBeenCalledTimes(1);
                expect(err).toBeInstanceOf(CustomError);
                expect(err.error_code).toEqual(ErrorCodes.PRICING_PROVIDER_ERROR);
            }
        });
    });
});
