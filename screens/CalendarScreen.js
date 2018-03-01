import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Container,
  Header,
  Title,
  Content,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body
} from 'react-native';
import { Button } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import CheckBox from 'react-native-checkbox';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(props) {
    super(props);

    this.state = {
      checkbox1: true,
      checkbox2: true,
      currentCheckbox: 2,
    };
    this.createCheckbox = this.createCheckbox.bind(this);
    this.exportToGoogleCalendar = this.exportToGoogleCalendar.bind(this);
  }

  createCheckbox() {
    this.setState({ currentCheckbox: this.state.currentCheckbox + 1 });
  }

  exportToGoogleCalendar() {
    console.log('exporting');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Calendar checkbox screen</Text>
        <CheckBox
          label='Get groceries'
          checked={this.state.checkbox1}
          onChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
        />
        <CheckBox
          label='Meditate'
          checked={this.state.checkbox2}
          onChange={() => this.setState({ checkbox2: !this.state.checkbox2 })}
        />
        <Button
          onPress={this.createCheckbox}
          title="Create calendar event"
        />
        <Button
          onPress={this.exportToGoogleCalendar}
          title="Export to Google Calendar"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
