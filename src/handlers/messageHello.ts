import type { App } from '@slack/bolt';


/**
 * not working Q____Q
 */
export default (app: App): void => {
    // Listens to incoming messages that contain "hello"
    app.message('hello', async ({ message, say }) => {
        // Filter out message events with subtypes (see https://api.slack.com/events/message)
        if (
            message.subtype === undefined ||
            message.subtype === 'bot_message'
        ) {
            // say() sends a message to the channel where the event was triggered
            await say({
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Hey there <@${message.user}>!`,
                        },
                        accessory: {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Click Me',
                            },
                            action_id: 'button_click',
                        },
                    },
                ],
                text: `Hey there <@${message.user}>!`,
            });
        }
    });

    app.action('button_click', async ({ body, ack, say }) => {
        // Acknowledge the action
        await ack();
        await say(`<@${body.user.id}> clicked the button`);
    });
};
