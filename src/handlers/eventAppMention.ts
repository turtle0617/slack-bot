import type { App } from '@slack/bolt';

export default (app: App): void => {
    app.event('app_mention', async ({ logger, event, say }) => {
        logger.debug(
            'app_mention event payload:\n\n' +
                JSON.stringify(event, null, 2) +
                '\n'
        );
        const result = await say({
            text: `:wave: <@${event.user}> Hi there!`,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: 'This is a section block with a button.',
                    },
                    accessory: {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: 'Click Me',
                            emoji: true,
                        },
                        value: 'click_me_123',
                        action_id: 'button_click',
                    },
                },
            ],
        });
        logger.debug(
            'say result:\n\n' + JSON.stringify(result, null, 2) + '\n'
        );
    });

    app.action('button_click', async ({ body, ack, say }) => {
        // Acknowledge the action
        await ack();
        await say(`<@${body.user.id}> clicked the button`);
    });
};
