import { createApp } from './app';

(async () => {
    try {
        const app = await createApp();

        app.listen(app.get('port'), () => {
            console.log(`Listening on port ${app.get('port')}`);
        });
    } catch (err) {
        console.log(err, 'Error caught in server.ts');
    }
})();
