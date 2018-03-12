import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class SigninScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.login = this.login.bind(this);
  }

  login() {
    console.log(this.state.text);
    this.props.navigation.navigate('Main')
  }
  
  render() {
    return (
      <View>
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
