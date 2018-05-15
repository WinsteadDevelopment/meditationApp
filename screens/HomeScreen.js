import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';
import axios from 'axios';
import { MonoText } from '../components/StyledText';
import { server } from '../globalVars';

const starImages = [
  require('../assets/images/0star.png'),
  require('../assets/images/1star.png'),
  require('../assets/images/2star.png'),
  require('../assets/images/3star.png'),
  require('../assets/images/4star.png'),
  require('../assets/images/5star.png'),
  require('../assets/images/6star.png'),
  require('../assets/images/7star.png'),
  require('../assets/images/8star.png')
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = new Date().getDate();
    const dateString = `${month}-${day}-${year}`;
    this.state = {
      completions: starImages[0],
      date: { dateString },
    };
    this.goToJournal = this.goToJournal.bind(this);
    this.goToTodo = this.goToTodo.bind(this);
    this.goToMeditations = this.goToMeditations.bind(this);
    this.goToWater = this.goToWater.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }
  componentWillMount() {
    AsyncStorage.getItem('Token')
      .then(token => {
        return axios.get(`${server}/userCompletions`, { headers: { authorization: JSON.parse(token) } })
      })
      .then(res => {
        console.log('response: ', res.data);
        this.setState({completions: starImages[JSON.parse(res.data)]});
      })
      .catch(err => console.error(err));
  }

  goToJournal() {
    this.props.navigation.navigate('Journal', { date: this.state.date});
  }
  
  goToTodo() {
    this.props.navigation.navigate('Todo', { date: this.state.date});
  }

  goToMeditations() {
    this.props.navigation.navigate('Meditations', { date: this.state.date});
  }

  goToWater() {
    this.props.navigation.navigate('Water', { date: this.state.date});
  }

  goToSettings() {
    this.props.navigation.navigate('Settings', { date: this.state.date});
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/milkyWay.jpg')}
        style={styles.container}
      >
        <Image
          source={this.state.completions}
          style={styles.starImage}
        />
        <View style={styles.rows}>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              onPress={this.goToJournal}
              style={styles.button}
            >
              <Ionicons name='ios-book' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Journal</Text>
          </View>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              onPress={this.goToTodo}
              style={styles.button}
            >
              <Ionicons name='ios-list' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>To-Do List</Text>
          </View>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              onPress={this.goToMeditations}
              style={styles.button}
            >
              <Ionicons name='ios-eye' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Meditations</Text>
          </View>
        </View>
        <View style={styles.rows}>
          <View style={styles.buttonColumn}>
            <TouchableOpacity
              onPress={this.goToWater}
              style={styles.button}
            >
              <Ionicons name='ios-book' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Water</Text>
          </View>
          {/* <View style={styles.buttonColumn}>
            <TouchableOpacity
              style={styles.button}
            >
              <Ionicons name='ios-list' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Calendar</Text>
          </View> */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity
            onPress={this.goToSettings}
              onPress={this.goToSettings}
              style={styles.button}
            >
              <Ionicons name='ios-eye' color='blue' size={60} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Settings</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  starImage: {
    width: 350,
    height: 350,
    marginTop: 50,
    marginBottom: 20
  },
  rows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    height: 50
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 80,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'purple',
    borderStyle: 'solid'
  },
  buttonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  }
});
 
