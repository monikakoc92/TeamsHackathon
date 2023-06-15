//Worked on 14/06
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("./adaptiveCards/TimerConfirm.json");
const timeUpCard = require("./adaptiveCards/drink.json");
const notificationTemplate = require("./adaptiveCards/SetTimer.json");
const { notificationApp } = require("./internal/initialize");
const { FifeteenMinsButtonActionHandler } = require('./15minsButtonActionHandler');

class FifeteenMinsButtonActionHandler { 
 triggerVerb = "15minsButton";
 
 async handleActionInvoked(context, actionData) { 
 const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
 const response = InvokeResponseFactory.adaptiveCard(responseCardJson);
 
 // Set a valid status code for the response
 response.statusCode = 200;
 
 // Wrap the response in an AdaptiveCardResponse object
 const adaptiveCardResponse = new AdaptiveCardResponse();
 adaptiveCardResponse.addCardResponse(response);
 
 return adaptiveCardResponse;
 }
}

module.exports = {
 FifeteenMinsButtonActionHandler,
}

/*
//Worked on 14/06
module.exports = async function (context, myTimer) {
    // Check if the timer object exists and has been past its due time
    if (myTimer.isPastDue) {
    context.log('Timer function is running late.');
    }
   
    const handler = new FifeteenMinsButtonActionHandler();
    const response = await handler.handleActionInvoked(context, {});
    
    // Send notification with the response card
    for (const target of await notificationApp.notification.installations()) {
    const responseCardJson = AdaptiveCards.declare(timeUpCard).render({});
    const adaptiveCardResponse = new AdaptiveCardResponse();
    adaptiveCardResponse.addCardResponse(response);
    
    await target.sendAdaptiveCard(
    AdaptiveCards.declare(notificationTemplate).render({
    notificationUrl: "http://adaptivecards.io/schemas/adaptive-card.json",
    responseCard: adaptiveCardResponse.adaptiveCard,
    })
    );
    }
   };
*/