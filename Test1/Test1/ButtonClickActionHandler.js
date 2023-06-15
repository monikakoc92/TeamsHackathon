const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("../adaptiveCards/drink.json");


class ButtonClickActionHandler { 
triggerVerb = "15minsButton";

    async handleActionInvoked(context, message) { 
        const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
        return InvokeResponseFactory.adaptiveCard(responseCardJson);
    }
}

 module.exports = {

   ButtonClickActionHandler,
}