const { TeamsBot } = require("../teamsBot");
const { notificationApp } = require("./initialize");
const { ResponseWrapper } = require("./responseWrapper");

module.exports = async function (context, req) {
  const res = new ResponseWrapper(context.res);
  await notificationApp.requestHandler(req, res, async (context) => {
  let response = null;
  if (context.activity.type === "invoke" && context.activity.name === "adaptiveCard/action") {
  response = await handleCardAction(context);
  } else {
  const teamsBot = new TeamsBot();
  response = await teamsBot.run(context);
  }
  console.log(response); // Log the response data to the console
  });
  return res.body;
 };
