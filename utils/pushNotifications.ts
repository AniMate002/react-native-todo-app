import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

export const createScheduledPushNotification = async (dueTime: Date) => {
    console.log("NOTIFICATION IS SCHEDULED")
    const now = new Date();
    const timeDifferenceInMinutes = (dueTime.getTime() - now.getTime()) / (60 * 1000);
    console.log("SENDING NOTIFICATION")
    
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "Success!",
          body: 'Task is created. We will let you know 30 mins before Due Time!',
        },
        trigger: null
    });

    if(timeDifferenceInMinutes < 30){
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Aloha!",
          body: 'Hey, Due Time is less than in 30mins. Hurry up to complete your task!',
        },
        trigger: null
    });
    }else{
      await Notifications.scheduleNotificationAsync({
          content: {
            title: "Aloha!",
            body: 'Hey, Due Time is Close! Are you done with this task?',
          },
          trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date: new Date(dueTime.getTime() - 30 * 60 * 1000),
          },
      });
    }

}