async function openModal({ logger, client, ack, body }) {
    try {
        const res = await client.views.open({
            trigger_id: body.trigger_id,
            // Block Kit Builder - http://j.mp/bolt-starter-modal-json
            view: {
                type: 'modal',
                callback_id: 'task-modal',
                private_metadata: JSON.stringify(body), // Remove this when pasting this in Block Kit Builder
                title: {
                    type: 'plain_text',
                    text: 'Create a task',
                    emoji: true,
                },
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                    emoji: true,
                },
                close: {
                    type: 'plain_text',
                    text: 'Cancel',
                    emoji: true,
                },
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
                            action_id: 'button-action',
                        },
                    },
                    {
                        type: 'input',
                        block_id: 'input-title',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'input',
                            initial_value: body.text, // Remove this when pasting this in Block Kit Builder
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Title',
                            emoji: true,
                        },
                        optional: false,
                    },
                    {
                        type: 'input',
                        block_id: 'input-deadline',
                        element: {
                            type: 'datepicker',
                            action_id: 'input',
                            placeholder: {
                                type: 'plain_text',
                                text: 'Select a date',
                                emoji: true,
                            },
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Deadline',
                            emoji: true,
                        },
                        optional: true,
                    },
                    {
                        type: 'input',
                        block_id: 'input-description',
                        element: {
                            type: 'plain_text_input',
                            action_id: 'input',
                            multiline: true,
                        },
                        label: {
                            type: 'plain_text',
                            text: 'Description',
                            emoji: true,
                        },
                        optional: true,
                    },
                ],
            },
        });
        logger.debug(
            'views.open response:\n\n' + JSON.stringify(res, null, 2) + '\n'
        );
        await ack();
    } catch (e) {
        logger.error(
            'views.open error:\n\n' + JSON.stringify(e, null, 2) + '\n'
        );
        await ack(`:x: Failed to open a modal due to *${e.code}* ...`);
    }
}

export default openModal;
