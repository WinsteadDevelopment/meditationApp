import React from 'react';
import { ScrollView, Text, StyleSheet, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsList from 'react-native-settings-list';


export default class Meditations extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>User Profile</Text>
        {/* <Button>Turn off push notifications</Button>
        <Button>Change Password</Button>
        <Button>Change Username</Button> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
