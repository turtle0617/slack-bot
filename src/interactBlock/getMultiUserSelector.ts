export default function ({ id, label }: Record<'id' | 'label', string>) {
    return {
        type: 'input',
        element: {
            type: 'multi_users_select',
            placeholder: {
                type: 'plain_text',
                text: 'Select users',
                emoji: true,
            },
            action_id: id,
        },
        label: {
            type: 'plain_text',
            text: label || 'Choose your team members',
            emoji: true,
        },
    };
}
