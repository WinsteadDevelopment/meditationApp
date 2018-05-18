import React from 'react';
import { ScrollView, Text, TextInput, Modal, View, AsyncStorage, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'
import CheckBox from 'react-native-check-box';
import axios from 'axios';
import { server } from '../globalVars';

export default class TodoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      input: '',
      modalVisible: false,
      date: this.props.navigation.state.params.date.dateString,
      isSelected: true
    };
    this.createTodo = this.createTodo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('Token')
      .then(token => {
        return axios.get(`${server}/todo`, { headers: { Authorization: JSON.parse(token), date: this.state.date } });
      })
      .then(res => {
        const newTodos = res.data.map(obj => obj.item);
        return this.setState({ todo: this.state.todo.concat(newTodos) });
      })
      .catch(err => console.log(err));
  }

  toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  createTodo() {
    if (!this.state.todo.includes(this.state.input)) {
      this.setState({ todo: this.state.todo.concat(this.state.input)})
      AsyncStorage.getItem('Token')
        .then(token => {
          return axios({
            method: 'post',
            url: `${server}/todo`,
            headers: {
              authorization: JSON.parse(token),
              'Content-Type': 'application/json',
            },
            data: {
              todo: this.state.input,
              date: this.state.date,
            },
          });
        })
        .then((res) => {
          this.toggleModal();
        })
        .catch((err) => console.log(err));
    } else {
      alert('You already have that in your to do list');
    }
  }

  onClick(data) {
    console.log('checkbox checked', data);
  }


  render() {
    const todoList = this.state.todo.map((element, i) => (
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        onClick={(data) => this.onClick(data)}
        isChecked={false}
        leftText={element}
      />
    ));
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.todoContainer}>
          <Text style={styles.headingText}>To do list for {this.state.date}:</Text>
          {todoList}
        </View>
        <Button
          style={{ paddingTop: 20 }}
          title="Create new item"
          onPress={this.toggleModal}
          buttonStyle={styles.button}
        />
        <Button
          title="Go home"
          onPress={() => this.props.navigation.navigate('Main')}
          buttonStyle={styles.button}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainer}>
            <View>
              <TextInput
                placeholder="Enter your task"
                onChangeText={(text) => this.setState({ input: text })}
                style={styles.eventInput}
              />
              <Button
                title="Save event"
                onPress={this.createTodo}
                buttonStyle={styles.button}
              />
              <Button
                title="Close"
                onPress={this.toggleModal}
                buttonStyle={styles.button}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  eventInput: {
    paddingBottom: 30,
    fontSize: 30
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 5
  },
  headingText: {
    fontSize: 30,
    paddingBottom: 20
  },
  modalContainer: {
    marginTop: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoContainer: {
    height: 'auto',
    minHeight: 400,
    // alignItems: 'center'
  },
  todo: {
    fontSize: 18
  },
})