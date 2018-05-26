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


export default class ForgotPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
        securityQuestion: '',
        securityAnswer: '',
        email: ''
    };
    this.checkSecurityQuestion = this.checkSecurityQuestion.bind(this)
  }

  checkSecurityQuestion(e) {
    e.preventDefault();
    axios.post(`${server}/checkSecurityQuestion`, { securityQuestion: this.state.securityQuestion, securityAnswer: this.state.securityAnswer, email: this.state.email })
      .then(res => {
        console.log(res.data)
        if (res.data !== 'security answer wrong') {
          AsyncStorage.setItem('Token', JSON.stringify(res.data));
          this.props.navigation.navigate('Main');
        } else {
          alert("Security answer wrong, please try again");
        }
      })
      .catch(err => {
        alert(err, 'Sorry, that security question or answer was incorrect');
      })
  }

  goBack(e) {
    e.preventDefault();
          this.props.navigation.navigate('Main');
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
            onChangeText={(securityQuestion) => this.setState({ securityQuestion })}
            placeholderTextColor='navy'
            placeholder="Your security Question"
            value={this.state.securityQuestion}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(securityAnswer) => this.setState({ securityAnswer })}
            placeholderTextColor='navy'
            placeholder="Question Answer"
            value={this.state.securityAnswer}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            placeholderTextColor='navy'
            placeholder="Your email address"
            value={this.state.email}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button 
            title="Sign in"
            onPress={this.checkSecurityQuestion}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            color='navy'
            alignItems={{textAlign: "right"}}
          />
          <Button 
            title="Main"
            onPress={this.goBack}
            buttonStyle={styles.button}
            titleStyle={{ color: 'black' }}
            color='navy'
            alignItems={{textAlign: "right"}}
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
  },
  forgotPassword: {
    color: 'white',
    top: 80,
  },
  newAccount: {
    color: 'white',
    top: 100,
  }
});
