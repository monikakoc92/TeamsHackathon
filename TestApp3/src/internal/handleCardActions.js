class MyBot {
 async handleAdaptiveCard(context) {
 // Handle the user's response to the Adaptive Card
 const cardData = context.activity.value;
 const timerMinutes = cardData["timerMinutes"];

 // Output the user's response to the terminal
 console.log(`User selected a timer of ${timerMinutes} minutes`);
 }

 async onTurn(context) {
 if (context.activity.type === ActivityTypes.Message) {
 // Handle message activity
 } else if (context.activity.type === ActivityTypes.Invoke && context.activity.name === "adaptiveCard/action") {
 await this.handleAdaptiveCard(context);
 }
 }
}
