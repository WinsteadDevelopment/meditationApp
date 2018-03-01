import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import Meditations from '../screens/Meditations';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Calendar: {
      screen: CalendarScreen,
    },
    Meditations: {
      screen: Meditations,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'md-home';
            break;
          case 'Calendar':
            iconName = Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar';
            break;
          case 'Meditations':
            iconName =
              Platform.OS === 'ios' ? `ios-eye${focused ? '' : '-outline'}` : 'md-eye';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
