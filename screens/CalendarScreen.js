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
    this.goToJournal = this.goToJournal.bind(this);
    this.goToTodo = this.goToTodo.bind(this);
  }

  toggleModal(date) {
    this.setState({ date });
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  goToJournal() {
    this.toggleModal();
    this.props.navigation.navigate('Journal', { date: this.state.date });
  }

  goToTodo() {
    this.toggleModal();
    this.props.navigation.navigate('Todo', { date: this.state.date });
  }

  render() {
    return (
      <View>
        <Calendar
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(date) => this.toggleModal(date)}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { console.log('month changed', month) }}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
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
              <Button
                title="See/edit your todo list for this day"
                onPress={this.goToTodo}
              />
              <Button
                title="Hide"
                onPress={this.toggleModal}
              />
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
