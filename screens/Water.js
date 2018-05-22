import React from 'react';
import { ScrollView, Text, StyleSheet, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Sleep extends React.Component {
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
        <Text>How many hours did you sleep last night??</Text>
        <Picker
          style={{ width: 100 }}
          selectedValue={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        >
          <Picker.Item label="0" value='0' />
          <Picker.Item label="1" value='1' />
          <Picker.Item label="2" value='2' />
          <Picker.Item label="3" value='3' />
          <Picker.Item label="4" value='4' />
          <Picker.Item label="5" value='5' />
          <Picker.Item label="6" value='6' />
          <Picker.Item label="7" value='7' />
          <Picker.Item label="8" value='8' />
          <Picker.Item label="8+" value={'8+'} />
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
