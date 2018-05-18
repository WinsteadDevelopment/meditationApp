import React from 'react';
import { ScrollView, Text, StyleSheet, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Exercise extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0'
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>How many minutes did you exercise today?</Text>
        <Picker
          style={{ width: 100 }}
          selectedValue={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        >
          <Picker.Item label='0' value='0' />
          <Picker.Item label='15' value='15' />
          <Picker.Item label='30' value='30' />
          <Picker.Item label='45' value='45' />
          <Picker.Item label='60' value='60' />
          <Picker.Item label='75' value='75' />
          <Picker.Item label='90' value='90' />
        </Picker>
        <Button
          title="Save"
          buttonStyle={styles.button}
        />
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
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 5,
    borderRadius: 50
  }
});
