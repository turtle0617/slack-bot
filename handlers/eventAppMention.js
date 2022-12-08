const eventAppMention = async ({ logger, event, say }) => {
    logger.debug("app_mention event payload:\n\n" + JSON.stringify(event, null, 2) + "\n");
    const result = await say({
      text: `:wave: <@${event.user}> Hi there!`,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "This is a section block with a button."
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me",
              "emoji": true
            },
            "value": "click_me_123",
            "action_id": "button-action"
          }
        }
  
      ]
  
    });
    logger.debug("say result:\n\n" + JSON.stringify(result, null, 2) + "\n");
  }

  export default eventAppMention
