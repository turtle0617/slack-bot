import type { App, SayFn, Logger } from '@slack/bolt';
import { getMultiUserSelector, getButton } from '../interactBlock';

const callMultiUsersSelector = async ({
    say,
    logger,
    config,
}: {
    say: SayFn;
    logger: Logger;
    config?: {
        selectorLabel?: string;
        submitBtnLabel?: string;
        submitBtnID?: string;
        selectorID?: string;
    };
}) => {
    try {
        const submitBtnID = config?.submitBtnID
            ? config.submitBtnID
            : Symbol('button_click').toString();

        const selectorID = config?.selectorID
            ? config.selectorID
            : Symbol('multi_users_select').toString();

        const result = await say({
            blocks: [
                getMultiUserSelector({
                    id: selectorID,
                    label: config?.selectorLabel || 'Choose your team members',
                }),
                getButton({
                    id: submitBtnID,
                    label: config?.submitBtnLabel || 'Click Me',
                }),
            ],
        });

        return {
            result,
            submitBtnID,
            selectorID,
        };
    } catch (error) {
        logger.error(
            'callMultiUsersSelector error:\n\n' +
                JSON.stringify(error, null, 2) +
                '\n'
        );

        return {
            error,
        };
    }
};

export default (app: App): void => {
    // Listen for mentions of the app
    app.event('app_mention', async ({ logger, event, say }) => {
        // Log the event payload for debugging purposes
        logger.debug(
            'app_mention event payload:\n\n' +
                JSON.stringify(event, null, 2) +
                '\n'
        );

        // Send a message to the channel that includes a multi-select menu element and a button
        const result = await callMultiUsersSelector({ say, logger });

        if (!result.result) {
            return;
        }

        // Log the result of the say() function for debugging purposes
        logger.debug(
            'say result:\n\n' + JSON.stringify(result?.result, null, 2) + '\n'
        );

        const { submitBtnID, selectorID } = result;

        // Listen for button clicks
        app.action(submitBtnID, async ({ body, ack, say, logger }) => {
            // Acknowledge the action
            logger.debug(
                'button_click event payload:\n\n' +
                    JSON.stringify(body, null, 2) +
                    '\n'
            );
            await ack();

            let selectedUserIds: string[] = [];

            if ('state' in body && typeof body.state === 'object') {
                const values = body.state.values;
                // Get the selected user(s) from the multi-select menu
                const selectedUsers =
                    Object.values(values).find((block) => block[selectorID]) ||
                    {};

                selectedUserIds =
                    selectedUsers[selectorID].selected_users?.map(
                        (id) => `<@${id}>`
                    ) || ([] as string[]);
            }

            logger.debug(
                'selectedUserIds\n\n' +
                    JSON.stringify(selectedUserIds, null, 2) +
                    '\n'
            );

            // Send a message to the channel with the selected user(s)
            await say(
                `The following user(s) were selected: ${selectedUserIds.join(
                    ','
                )}`
            );
            if ('container' in body) {
                const { message_ts, channel_id } = body.container;
                const result = await app.client.chat.delete({
                    token: process.env.SLACK_BOT_TOKEN,
                    channel: channel_id,
                    ts: message_ts,
                });

                logger.debug(
                    'delete result:\n\n' +
                        JSON.stringify(result, null, 2) +
                        '\n'
                );
            }
        });
    });
};
