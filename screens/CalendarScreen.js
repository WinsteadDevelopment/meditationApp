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
  Body,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import CheckBox from 'react-native-checkbox';
import { NavigationActions } from 'react-navigation';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  constructor(){
    super();
    this.state = {
      modalVisible: false,
      date: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.goToJournal = this.goToJounral.bind(this);
  }

  toggleModal(date) {
    this.setState({ date });
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  goToJounral() {
    this.toggleModal();
    this.props.navigation.navigate('Journal', { date: this.state.date });
  }

  render() {
    return (
      <View>
        <Button
          title="See journal entry page"
          onPress={() => this.props.navigation.navigate('Journal')}
        />
        <Calendar
          // Initially visible month. Default = Date()
          current={'2018-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2000-01-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2020-01-01'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(date) => this.toggleModal(date)}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { console.log('month changed', month) }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Button
                title="Write a journal entry for this day"
                onPress={this.goToJournal}
              />
              <TouchableHighlight
                onPress={this.toggleModal}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>

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
