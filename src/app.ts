import express, { Application } from 'express';
import { HealthcheckController } from './controllers/healthcheck';

async function initialiseDependencies() {
    const healthcheckController = new HealthcheckController();

    return {
        healthcheckController
    };
}

async function setupRoutes(app: Application): Promise<void> {
    const { healthcheckController } = await initialiseDependencies();

    app.use(healthcheckController.getRouter());
}

export async function createApp(): Promise<Application> {
    const app = express();

    app.set('port', 3000);
    app.use(express.json({ limit: '5mb', type: 'application/json' }));
    app.use(express.urlencoded({ extended: true }));

    await setupRoutes(app);

    return app;
}
