// Require the Bolt package (github.com/slackapi/bolt)
import slackBolt from '@slack/bolt';
import { LogLevel } from '@slack/logger';
import { config } from 'dotenv';
import { eventAppMention } from './handlers/index.js';

const { App } = slackBolt;

config();

// Enable helpful logging for debugging
const developerMode = true;
const logLevel = process.env.SLACK_LOG_LEVEL || LogLevel.DEBUG;

const app = new App({
    socketMode: true,
    appToken: process.env.APP_TOKEN,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel,
    developerMode,
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);

    console.log('⚡️ Bolt app is running!');
})();

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event('app_mention', eventAppMention);
