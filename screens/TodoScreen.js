import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class JournalScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      entry: '',
    };
    this.submitEntry = this.submitEntry.bind(this);
  }

  submitEntry() {
    console.log(this.state.entry);
  }

  render() {
    return (
      <ScrollView>
        <Text>To do:</Text>
      </ScrollView>
    );
  }
}
