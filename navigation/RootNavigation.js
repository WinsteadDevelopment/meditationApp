import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signin from '../screens/SigninScreen';
import Signup from '../screens/SignupScreen';
import JournalScreen from '../screens/JournalScreen';
import TodoScreen from '../screens/TodoScreen';
import Water from '../screens/Water';
import Settings from '../screens/Settings';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Signin: {
      screen: Signin,
    },
    Signup: {
      screen: Signup,
    },
    Main: {
      screen: MainTabNavigator,
    },
    Journal: {
      screen: JournalScreen,
    },
    Todo: {
      screen: TodoScreen,
    },
    Water: {
      screen: Water,
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    // console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
