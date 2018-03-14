import React from 'react';
import { TextInput, View, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { server } from '../globalVars';

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.signup = this.signup.bind(this);
  }

  signup() {
    axios.post(`${server}/signup`, { username: this.state.username, password: this.state.password, email: this.state.email })
      .then(res => {
        AsyncStorage.setItem('Token', JSON.stringify(res.data));
        this.props.navigation.navigate('Main');
      })
      .catch(err => {
        console.error(err);
        alert('Sorry, there was a problem. Please try again');
      });
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
        <Text>Email:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(email) => this.setState({ email })}
          placeholder="email"
          value={this.state.email}
        />
        <Text>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(password) => this.setState({ password })}
          placeholder="password"
          value={this.state.password}
        />
        <Button
          title="Create account"
          onPress={this.signup}
        />
        <Button
          title="Sign in with existing account"
          onPress={() => this.props.navigation.navigate('Signin')}
        />
      </View>
    )
  }
}
