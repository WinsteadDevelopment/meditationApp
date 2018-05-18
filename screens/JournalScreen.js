import React from 'react';
import {
  ScrollView,
  TextInput,
  AsyncStorage,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Button } from 'react-native-elements';
import axios from 'axios';
import { server } from '../globalVars';

export default class JournalScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      entry: '',
    };
    this.submitEntry = this.submitEntry.bind(this);
  }

  submitEntry() {
    AsyncStorage.getItem('Token')
      .then(token =>{
        return axios({
          method: 'post',
          url: `${server}/journal`,
          headers: {
            authorization: JSON.parse(token),
            'Content-Type': 'application/json',
          },
          data: { entry: this.state.entry, date: this.props.navigation.state.params.date},
        });
      })
      .then(response =>{
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    const date = this.props.navigation.state.params.date;
    console.log(date);
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Journal entry for {date.dateString}</Text>
        <TextInput
          multiline={true}
          style={styles.inputField}
          placeholder="Write your journal entry here"
          onChangeText={(entry) => this.setState({ entry })}
        />
        <View style={styles.buttonsContainer}>
          <Button
            onPress={this.submitEntry}
            title="Save"
            buttonStyle={styles.button}
          />
          <Button
            title="Return home"
            onPress={() => this.props.navigation.navigate('Main')}
            buttonStyle={styles.button}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 30,
    textAlign: 'center'
  },
  inputField: {
    height: 'auto',
    minHeight: 50,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 5,
    borderRadius: 50
  }
})