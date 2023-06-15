const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { AdaptiveCardResponse, InvokeResponseFactory } = require("@microsoft/teamsfx");
const responseCard = require("./adaptiveCards/drink.json");
const notificationTemplate = require("./adaptiveCards/SetTimer.json");
const { notificationApp } = require("./internal/initialize");
const { ButtonClickActionHandler } = require('./ButtonClickActionHandler');

/*
class ButtonClickActionHandler { 
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
    ButtonClickActionHandler,
   }
   
   module.exports = async function (context, myTimer) {
       // Check if the timer object exists and has been past its due time
       if (myTimer.isPastDue) {
       context.log('Timer function is running late.');
       }
      
       const handler = new ButtonClickActionHandler();
       const response = await handler.handleActionInvoked(context, {});
       
       // Send notification with the response card
       for (const target of await notificationApp.notification.installations()) {
       const responseCardJson = AdaptiveCards.declare(responseCard).render({});
       const adaptiveCardResponse = new AdaptiveCardResponse();
       adaptiveCardResponse.addCardResponse(response);
       
       await target.sendAdaptiveCard(
       AdaptiveCards.declare(notificationTemplate).render({
       notificationUrl: "http://adaptivecards.io/schemas/adaptive-card.json",
       responseCard: adaptiveCardResponse.adaptiveCard,
       })
       );
       }
       */
       
       class ButtonClickActionHandler {
        triggerVerb = "15minsButton";
        
        async handleActionInvoked(context, actionData) { 
        const delayInSeconds = 5;
       
        // Schedule the delayed action
        setTimeout(async () => {
        const responseCardJson = AdaptiveCards.declare(responseCard).render(actionData);
        const response = InvokeResponseFactory.adaptiveCard(responseCardJson);
        
        // Set a valid status code for the response
        response.statusCode = 200;
        
        // Wrap the response in an AdaptiveCardResponse object
        const adaptiveCardResponse = new AdaptiveCardResponse();
        adaptiveCardResponse.addCardResponse(response);
        
        return adaptiveCardResponse;
        }, delayInSeconds * 1000);
        }
       }
       
       module.exports = {
        ButtonClickActionHandler,
       }

       // Time trigger to send notification. You can change the schedule in ../timerNotifyTrigger/function.json
       module.exports = async function (context, myTimer) {
         const timeStamp = new Date().toISOString();
         for (const target of await notificationApp.notification.installations()) {
           await target.sendAdaptiveCard(
             AdaptiveCards.declare(notificationTemplate).render({
                notificationUrl: "http://adaptivecards.io/schemas/adaptive-card.json",
             })
           );
         }
      };
