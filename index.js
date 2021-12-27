/**
 * @format
 */

import {Alert, AppRegistry, View, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import notifee, {
  EventType,
  AndroidImportance,
  AndroidCategory,
  AndroidVisibility,
} from '@notifee/react-native';

notifee.stopForegroundService();

async function onDisplayNotification() {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default1',
    name: 'Default Channel 1',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    category: AndroidCategory.CALL,
  });

  // Display a notification
  await notifee.displayNotification({
    channelId,
    visibility: AndroidVisibility.PUBLIC,
    title: 'Notification Title',
    category: AndroidCategory.CALL,
    importance: AndroidImportance.HIGH,
    body: 'Main body content of the notification',
    android: {
      channelId,
      // Recommended to set a category
      category: AndroidCategory.CALL,
      // Recommended to set importance to high
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      title: 'Notification Title',
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      body: 'Main body content of the notification',
      fullScreenAction: {
        visibility: AndroidVisibility.PUBLIC,
        title: 'Notification Title',
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        body: 'Main body content of the notification',
        // For Android Activity other than the default:
        id: 'default',
        //mainComponent: 'custom',
        launchActivity: 'com.rnvoipcall.FullScreenIntent',
      },
      pressAction: {
        visibility: AndroidVisibility.PUBLIC,
        title: 'Notification Title',
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        body: 'Main body content of the notification',
        // For Android Activity other than the default:
        id: 'default',
        //mainComponent: 'custom',
        launchActivity: 'com.rnvoipcall.FullScreenIntent',
      },
      //asForegroundService: true,
    },
  });
}

notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    console.log('morneng registerForegroundService', {notification});
  });
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('morneng onBackgroundEvent', type, detail);
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS || type === EventType.ACTION_PRESS) {
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
      console.log('morneng onBackgroundEvent conditional block');
    }
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});
messaging().onMessage(async (remoteMessage) => {
  await onDisplayNotification();
});
//
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  await onDisplayNotification();
});
//
// AppRegistry.registerHeadlessTask('headlessTask', () =>
//   require('./headlessTask'),
// );

AppRegistry.registerComponent(appName, () => App);
