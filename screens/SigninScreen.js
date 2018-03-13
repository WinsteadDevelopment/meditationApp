import React from 'react';
import { TextInput, View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

export default class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.login = this.login.bind(this);
  }

  login() {
    console.log(this.state);
    axios.post('http://af4ec08e.ngrok.io/signup', { username: this.state.username, password: this.state.password })
      .then(res => {
        if (res.data !== 'Sorry, that password was incorrect') {
          AsyncStorage.setItem('Token', JSON.stringify(res.data));
          this.props.navigation.navigate('Main');
        } else {
          alert(res.data);
        }
      })
      .catch(err => {
        alert('Sorry, that username/password combination was incorrect');
      })
  }


  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Username:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(username) => this.setState({ username })}
          placeholder="username"
          value={this.state.username}
        />
        <Text>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(password) => this.setState({ password })}
          placeholder="password"
          value={this.state.password}
        />
        <Button 
          title="Sign in"
          onPress={this.login}
        />
      </View>
    )
  }
}
