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
        <Text>5 minute meditation</Text>
        <Text>10 minute meditation</Text>
        <Text>30 minute meditation</Text>
        <Text>1 hour meditation</Text>
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
