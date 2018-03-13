import React from 'react';
import { ScrollView, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { server } from '../globalVars';

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
    AsyncStorage.getItem('Token')
      .then(token =>{
        return axios.post(`${server}/journal`, 
          {headers: 
            {
              authorization: JSON.parse(token)
            }, 
            data: {
              entry: this.state.entry
            }
          })
      })
      .catch((err) => {
        console.error(err);
      })
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
