const { TeamsActivityHandler, CardFactory, TurnContext } = require("botbuilder");
const rawWelcomeCard = require("./adaptiveCards/welcome.json");
const rawSetCard = require("./adaptiveCards/SetTimer.json");
const rawConfirmCard = require("./adaptiveCards/TimerConfirm.json");
const rawdrinkCard = require("./adaptiveCards/drink.json");
const cardTools = require("@microsoft/adaptivecards-tools");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    

    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");
      let txt = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }

      // Trigger command by IM text
      switch (txt) {
        case "welcome": {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        case "set timer": {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawSetCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        case "time confirm": {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawConfirmCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        };
        case "drink up": {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawdrinkCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        /**
         * case "yourCommand": {
         *   await context.sendActivity(`Add your response here!`);
         *   break;
         * }
         */
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    // Listen to MembersAdded event, view https://docs.microsoft.com/en-us/microsoftteams/platform/resources/bot-v3/bots-notifications for more events
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = cardTools.AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
      }
      await next();
    });

    /*
    this.onMessage(async (context) => {
      if (context.activity.value) {
      const value = context.activity.value;
      if (value.buttonName === "15minsButton") {
      const card = cardTools.AdaptiveCards.declareWithoutData(rawdrinkCard).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
      }
      // you can add more cases here to handle other button clicks
      } else {
      // handle regular messages
      }
     });
     */

  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(context, invokeValue) {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    if (invokeValue.action.verb === "15minsButton") {

      const card = cardTools.AdaptiveCards.declare(rawConfirmCard).render();
      await context.updateActivity({
        type: "message",
        id: context.activity.replyToId,
        attachments: [CardFactory.adaptiveCard(card)],
      });
      return { statusCode: 200 };
    }
  }

  /*
  async onAdaptiveCardInvoke(context, invokeValue) {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    if (invokeValue.action.verb === "15minsButton") {

      const card = cardTools.AdaptiveCards.declare(rawdrinkCard).render();
      await context.updateActivity({
        type: "action",
        id: context.activity.replyToId,
        attachments: [CardFactory.adaptiveCard(card)],
      });
      return { statusCode: 200 };
    }
  }*/
}

class TeamsBot extends TeamsActivityHandler {
  // Handler for button clicks in Adaptive Cards
  async onMessageActivity(context, next) {
  if (context.activity.value) {
  const value = context.activity.value;
  // Check if the button clicked is the "15minsButton" button
  if (value.verb === "15minsButton") {
  // Call a method or handler to handle the button click
  await this.handle15MinsButtonClick(context);
  }
  } else {
  // Handle regular messages
  await next();
  }
  }
 
  // Method to handle the "15minsButton" button click
  async handle15MinsButtonClick(context) {
  // Code to execute when the button is clicked
  const card = cardTools.AdaptiveCards.declare(rawdrinkCard).render();
  await context.updateActivity({
  type: "message",
  id: context.activity.replyToId,
  attachments: [CardFactory.adaptiveCard(card)],
  });
  }
 }

module.exports.TeamsBot = TeamsBot;
