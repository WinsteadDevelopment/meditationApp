import React from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  Picker,
  ImageBackground 
} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Sleep extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0'
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/milkyWay.jpg')}
        style={styles.container}
      >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>For how many minutes did you exercise?</Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        >
          <Picker.Item label="0" value='0' />
          <Picker.Item label="5" value='5' />
          <Picker.Item label="10" value='10' />
          <Picker.Item label="15" value='15' />
          <Picker.Item label="20" value='20' />
          <Picker.Item label="25" value='25' />
          <Picker.Item label="30" value='30' />
          <Picker.Item label="35" value='35' />
          <Picker.Item label="40" value='40' />
          <Picker.Item label="45" value='45' />
          <Picker.Item label="50" value='50' />
          <Picker.Item label="55" value='55' />
          <Picker.Item label="60" value='60' />
          <Picker.Item label="60+" value={'60+'} />
        </Picker>
        <Button
          title="Save"
          buttonStyle={styles.button}
        />
      </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    marginTop: 200,
    textAlign: 'center',
    color: '#eac369'
  },
  button: {
    backgroundColor: '#c394cc',
    color: '#f3e1f7',
    borderRadius: 50,
    marginBottom: 5,
    borderRadius: 50,
    marginTop: 30,
  },
  picker: {
    width: 100, 
    color: '#f3e1f7', 
    backgroundColor: '#c394cc',
    marginTop: 100, 
  }
});
