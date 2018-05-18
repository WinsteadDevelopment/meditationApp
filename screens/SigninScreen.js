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
import { server } from '../globalVars';
import SignupScreen from './SignupScreen';

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
    axios.post(`${server}/signin`, { username: this.state.username, password: this.state.password })
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
            placeholderTextColor='navy'
            placeholder="Username"
            value={this.state.username}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            placeholderTextColor='navy'
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
            color='navy'
          />
          <Button
            title="Create a new account"
            onPress={() => this.props.navigation.navigate('Signup')}
            buttonStyle={styles.button}
            titleStyle={{ color: 'navy' }}
            color='navy'
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
    borderWidth: 2,
    borderColor: 'black',
    width: '90%',
    backgroundColor: 'rgb(236, 198, 85)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center'
  },
  button: {
    //backgroundColor: '#191970',
    backgroundColor: 'rgb(236, 198, 85)',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
  }
});
