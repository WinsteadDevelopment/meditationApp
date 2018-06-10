import React from 'react';
import {
  TextInput,
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import { server } from '../globalVars';
import SignupScreen from './SignupScreen';
import loginBackground from '../assets/images/loginBackground.jpg';
import star from '../assets/images/8star.png';

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
        source={loginBackground}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Whatever the fucking name of this app is :D</Text>
          <Image style={styles.star} source={star} />
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
          <View style={styles.bottomButtons}>
            <TouchableHighlight>
              <Text style={styles.bottomText}>Forgot password?</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.bottomText}>New user?</Text>
            </TouchableHighlight>
          </View>
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
    width: '100%',
    alignItems: 'center',
    paddingTop: 50
  },
  header: {
    fontSize: 36,
    color: 'yellow',
    textShadowColor: 'red',
    textShadowOffset: {
      width: -2,
      height: 2
    },
    textShadowRadius: 3,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    width: '90%',
    backgroundColor: 'rgba(236, 198, 85, 0.5)',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'rgba(236, 198, 85, 0.5)',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  star: {
    width: 275,
    height: 275,
    marginBottom: 30
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 150,
    width: '90%'
  },
  bottomText: {
    color: 'white',
    textDecorationLine: 'underline'
  }
});
