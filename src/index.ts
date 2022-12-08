import app from './app';
import * as handlers from './handlers/index';

handlers.eventAppMention(app);

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();
