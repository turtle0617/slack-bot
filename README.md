# Slack bot using slack bolt js sdk

- [Official Tutorial](https://slack.dev/bolt-js/tutorial/getting-started)
- [Official Typescript Example](https://github.com/slackapi/bolt-js/tree/main/examples/getting-started-typescript)
- [Event API](https://api.slack.com/events)
- [Block elements API](https://api.slack.com/reference/block-kit/block-elements#button)
- [Block kit builder](https://app.slack.com/block-kit-builder)

## Development
1. clone
2. prepare `.env` file at repository root folder, containing:
    ```bash
    SLACK_SIGNING_SECRET="your_slack_bot_signing_secret"
    SLACK_BOT_TOKEN="your_slack_bot_token"
    APP_TOKEN="your_slack_bot_app_token"
    ```
if you don't know how to prepare, go to the [Official Tutorial](https://slack.dev/bolt-js/tutorial/getting-started)

3. run `yarn install`
4. run `yarn run dev`

## Feature
- Metion the bot in slack
   - It will response the multi users selecotr and a button
   - If you click the button, the bot will return the selector result and delet the message before.

