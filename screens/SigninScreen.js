import React from 'react';
import {
  TextInput,
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground
} from 'react-native';
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
      <ImageBackground
        source={require('../assets/images/loginBackground.jpg')}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => this.setState({ username })}
            placeholder="username"
            value={this.state.username}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            placeholder="password"
            value={this.state.password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <Button 
            title="Sign in"
            onPress={this.login}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
          />
          <Button
            title="Create a new account"
            onPress={() => this.props.navigation.navigate('Signup')}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
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
    backgroundColor: '#000000'
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
