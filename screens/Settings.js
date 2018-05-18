import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Meditations extends React.Component {
  static navigationOptions = {
    title: 'Meditations',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Settings</Text>
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
