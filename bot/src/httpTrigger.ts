import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import notificationTemplate from "./adaptiveCards/notification-default.json";
import { CardData } from "./cardModels";
import { bot } from "./internal/initialize";
import AffirmationService from "../src/service/AffirmationService"


const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {

  const timeStamp = new Date().toLocaleString()
  let data = await AffirmationService.getAffirmations();

  // By default this function will iterate all the installation points and send an Adaptive Card
  // to every installation.
  for (const target of await bot.notification.installations()) {
    await target.sendAdaptiveCard(
      AdaptiveCards.declare<CardData>(notificationTemplate).render({
        appName: "Weekly Affirmation App Notification",
        name: "Eric Dettery",
        profileImage: "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
        createdUtc: `${timeStamp}`,
        motivation: `${data.text}`,
      })
    );

  }

  context.res = {};
};

export default httpTrigger;
