const axios = require('axios');

async function handleViewSubmission({ logger, client, body, ack }) {
    logger.debug(
        'view_submission view payload:\n\n' +
            JSON.stringify(body.view, null, 2) +
            '\n'
    );

    const stateValues = body.view.state.values;
    const title = stateValues['input-title']['input'].value;
    const deadline = stateValues['input-deadline']['input'].selected_date;
    const description = stateValues['input-description']['input'].value;

    const errors = {};
    if (title.length <= 5) {
        errors['input-title'] = 'Title must be longer than 5 characters';
    }
    if (Object.entries(errors).length > 0) {
        await ack({
            response_action: 'errors',
            errors: errors,
        });
    } else {
        // Save the input to somewhere
        logger.info(
            `Valid response:\ntitle: ${title}\ndeadline: ${deadline}\ndescription: ${description}\n`
        );
        // Post a message using response_url given by the slash comamnd
        const command = JSON.parse(body.view.private_metadata);
        const message = {
            text: '[fallback] Somehow Slack app failed to render blocks',
            // Block Kit Builder - http://j.mp/bolt-starter-msg-json
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Your new task was successfully created! :rocket:*',
                    },
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*Title:*\n${title}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Deadline:*\n${deadline}`,
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Description:*\n${description}`,
                        },
                    ],
                },
            ],
        };
        if (command && command.response_url) {
            // Cannot use respond here as the response_url is not given here
            message.response_type = 'ephemeral'; // or "in_channel"
            await postViaResponseUrl(
                command.response_url, // available for 30 minutes
                message
            );
        } else {
            const res = await client.chat.postMessage({
                channel: body.user.id,
                text: message.text,
                blocks: message.blocks,
            });
            logger.debug(
                'chat.postMessage response:\n\n' +
                    JSON.stringify(res, null, 2) +
                    '\n'
            );
        }
        await ack();
    }
}

function postViaResponseUrl(responseUrl, response) {
    return axios.post(responseUrl, response);
}

export default handleViewSubmission;
