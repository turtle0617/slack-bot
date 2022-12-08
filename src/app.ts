// Require the Bolt package (github.com/slackapi/bolt)
import { App, LogLevel } from '@slack/bolt';
import { config } from 'dotenv';

config();

// Enable helpful logging for debugging
const developerMode = process.env.DEBUG === 'true' || false;
const logLevel = (process.env.SLACK_LOG_LEVEL as LogLevel) || LogLevel.DEBUG;

const app = new App({
    socketMode: true,
    appToken: process.env.APP_TOKEN,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    logLevel,
    developerMode,
});

app.use(async ({ next }) => {
    await next();
});

export default app;

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
// app.event('app_mention', eventAppMention);
// app.event('reaction_added', );
