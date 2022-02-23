import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { CustomError } from '../utils/error';

export interface IPricingProvider {
    getExternalPrice(numberPlate: string): Promise<number>;
}

export class PricingProvider implements IPricingProvider {
    baseURL: string;

    constructor() {
        this.baseURL = process.env.PRICING_PROVIDER_BASE_URL || 'http://google.com';
    }

    async getExternalPrice(numberPlate: string): Promise<number> {
        try {
            const requestConfig: AxiosRequestConfig = {
                baseURL: this.baseURL,
                method: 'GET',
                url: `/prices/${numberPlate}`
            };

            const { data } = await axios.request(requestConfig);

            // assuming the returned response from 3rd party is { price: <some number> }
            if (Number(data.price) === NaN) {
                throw new CustomError('PRICING_PROVIDER_ERROR', `Price is not a number`, { data });
            }

            return Number(data.price);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw new CustomError('PRICING_PROVIDER_ERROR', `Unable to get pricing from ${this.baseURL}`, { err });
            }

            throw err;
        }
    }
}
