import React from 'react';
import { ScrollView, TextInput, AsyncStorage, Text, View } from 'react-native';
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
    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center' }} >
          <Text style={{ paddingTop: 40, fontSize: 20 }}>Journal entry for {date.dateString}</Text>
        </View>
        <TextInput
          multiline={true}
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
