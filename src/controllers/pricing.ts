import { NextFunction, Request, Response, Router } from 'express';
import { GetPriceRequest, GetPriceResponse } from '../entities/pricing';
import { IPricingService } from '../services/pricing';

export class PricingController {
    private router: Router;
    private pricingService: IPricingService;

    constructor(pricingService: IPricingService) {
        this.pricingService = pricingService;
        this.router = Router();
        this.router.get('/pricing/:number_plate', this.getPrice.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getPrice(req: Request, res: Response, next: NextFunction) {
        const getPriceRequest: GetPriceRequest = {
            numberPlate: req.params.number_plate
        };

        if (typeof req.query?.skipCacheForRead === 'boolean') {
            getPriceRequest.skipCacheForRead = req.query.skipCacheForRead;
        }

        const response = await this.pricingService.getPriceByNumberPlate(
            getPriceRequest.numberPlate,
            getPriceRequest.skipCacheForRead
        );

        res.status(200).json(response);
    }
}
