import React from 'react';
import { TextInput, View, Text, AsyncStorage, StyleSheet, ImageBackground } from 'react-native';
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
      <ImageBackground
        source={require('../assets/images/treeStars.jpg')}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => this.setState({ username })}
            placeholder="username"
            value={this.state.username}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            placeholder="email"
            value={this.state.email}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            placeholder="password"
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button
            buttonStyle={styles.button}
            title="Create account"
            onPress={this.signup}
          />
          <Button
            buttonStyle={styles.button}
            title="Sign in with existing account"
            onPress={() => this.props.navigation.navigate('Signin')}
          />
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderWidth: 0,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,.8)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  button: {
    backgroundColor: '#191970',
    marginBottom: 10
  }
});
