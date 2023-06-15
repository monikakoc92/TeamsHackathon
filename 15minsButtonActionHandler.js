const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("./adaptiveCards/TimerConfirm.json");


class FifeteenMinsButtonActionHandler { 
triggerVerb = "15minsButton";

    async handleActionInvoked(context, {actionData}) { 
        const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
        return InvokeResponseFactory.adaptiveCard(responseCardJson);
    }
}

 module.exports = {

    FifeteenMinsButtonActionHandler,
}
