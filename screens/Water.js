import React from 'react';
import {Button, ScrollView, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Meditations extends React.Component {
  static navigationOptions = {
    title: 'Meditations',
  };
  state = {
    language
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Water Tracking Page</Text>
        <Text>How much water did you drink today?</Text>
        {/* <Button>1 Cup</Button>
        <Button>2 Cups</Button>
        <Button>3 Cups</Button>
        <Button>5 Cups</Button> */}
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
