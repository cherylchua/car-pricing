import express, { Application } from 'express';
import { PricingProvider } from './clients/pricingProvider';
import { HealthcheckController } from './controllers/healthcheck';
import { PricingController } from './controllers/pricing';
import { PricingService } from './services/pricing';

async function initialiseDependencies() {
    const pricingProvider = new PricingProvider();
    const pricingService = new PricingService(pricingProvider);

    const healthcheckController = new HealthcheckController();
    const pricingController = new PricingController(pricingService);

    return {
        healthcheckController,
        pricingController
    };
}

async function setupRoutes(app: Application) {
    const { healthcheckController, pricingController } = await initialiseDependencies();

    app.use(healthcheckController.getRouter());
    app.use(pricingController.getRouter());
}

export async function createApp(): Promise<express.Application> {
    const app = express();

    app.set('port', 3000);
    app.use(express.json({ limit: '5mb', type: 'application/json' }));
    app.use(express.urlencoded({ extended: true }));

    await setupRoutes(app);

    return app;
}
