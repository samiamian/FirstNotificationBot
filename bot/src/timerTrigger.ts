import { AzureFunction, Context } from "@azure/functions";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import notificationTemplate from "./adaptiveCards/notification-default.json";
import { CardData } from "./cardModels";
import { bot } from "./internal/initialize";
import AffirmationService from "../src/service/AffirmationService"
import { NotificationTargetType } from "@microsoft/teamsfx";



// async function getAffirmations(): Promise<AffirmationData> {
//   const response = await fetch('https://type.fit/api/quotes');

//   const data: any = await response.json();
//   const aVal = data[Math.floor(Math.random() * data.length)];
//   return {text: aVal.text,author: aVal.author} as AffirmationData
// }

// An Azure Function timer trigger.
//
// This function fires periodically. You can adjust the schedule in `../timerNotifyTrigger-/function.json`.
//
// When this function is triggered, it sends an Adaptive Card to Teams. You can update the logic in this function
// to suit your needs. You can poll an API or retrieve data from a database, and based on the data, you can
// send an Adaptive Card as required.
const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
  const timeStamp = new Date().toLocaleString()
  let data = await AffirmationService.getAffirmations();

  // By default this function will iterate all the installation points and send an Adaptive Card
  // to every installation.
  for (const target of await bot.notification.installations()) {
    if (target.type === NotificationTargetType.Group) {
      // You can send the Adaptive Card to the Group Chat
      await target.sendAdaptiveCard(
        AdaptiveCards.declare<CardData>(notificationTemplate).render({
          appName: "Weekly Affirmation App Notification",
          name: "Eric Dettrey",
          profileImage: "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
          createdUtc: `${timeStamp}`,
          motivation: `${data.text}`,
        })
      );
    }
  }
};

export default timerTrigger;
