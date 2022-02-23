import { Request, Response, Router } from 'express';
import { GetPriceRequest } from '../entities/pricing';
import { IPricingService } from '../services/pricing';

export class PricingController {
    private router: Router;
    pricingService: IPricingService;

    constructor(pricingService: IPricingService) {
        this.pricingService = pricingService;
        this.router = Router();
        this.router.get('/pricing', this.getPrice);
    }

    async getRouter() {
        return this.router;
    }

    async getPrice(req: Request, _: Response) {
        const getPriceRequest: GetPriceRequest = {
            numberPlate: req.params.numberPlate
        };

        if (typeof req.query.skipCacheForRead === 'boolean') {
            getPriceRequest.skipCacheForRead = req.query.skipCacheForRead;
        }

        return this.pricingService.getPriceByNumberPlate(getPriceRequest.numberPlate, getPriceRequest.skipCacheForRead);
    }
}
