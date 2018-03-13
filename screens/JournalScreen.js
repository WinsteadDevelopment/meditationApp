import React from 'react';
import { ScrollView, TextInput } from 'react-native';
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
        <TextInput
          style={{ height: 400 }}
          placeholder="Write your journal entry here"
          onChangeText={(entry) => this.setState({ entry })}
        />
        <Button
          onPress={this.submitEntry}
          title="Save your journal entry"
        />
        <Button
          title="Return home"
          onPress={() => this.props.navigation.navigate('Main')}
        />
      </ScrollView>
    );
  }
}
