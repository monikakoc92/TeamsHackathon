const { TeamsActivityHandler } = require("botbuilder");

// An empty teams activity handler.
// You can add your customization code here to extend your bot logic if needed.
class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
  }
}

module.exports.TeamsBot = TeamsBot;

async function run(context) {
  if (context.activity.type === "message") {
  
  } else if (context.activity.type === "invoke" && context.activity.name === "adaptiveCard/action") {
  await handleCardAction(context);
  }
 }