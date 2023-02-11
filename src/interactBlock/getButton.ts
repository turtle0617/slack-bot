export default function ({ id, label }: Record<'id' | 'label', string>) {
    return {
        type: 'actions',
        elements: [
            {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: label,
                    emoji: true,
                },
                value: 'submit',
                action_id: id,
            },
        ],
    };
}
