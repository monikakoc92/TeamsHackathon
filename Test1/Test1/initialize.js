const { BotBuilderCloudAdapter } = require("@microsoft/teamsfx");
const ConversationBot = BotBuilderCloudAdapter.ConversationBot;
const config = require("./config");
const { FifeteenMinsButtonActionHandler } = require("./15minsButtonActionHandler");
const { ButtonClickActionHandler } = require("./ButtonClickActionHandler");

// Create bot.
const notificationApp = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  // Enable notification
  notification: {
    enabled: true,
  },
  //Enable card actions
  cardAction: { 
    enabled: true, 
    actions: [ 
      new FifeteenMinsButtonActionHandler(),
      new ButtonClickActionHandler()
    ], 
  }
});

module.exports = {
  notificationApp,
};