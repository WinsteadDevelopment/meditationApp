import React from 'react';
import { ScrollView, Text, TextInput, Modal, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'
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
    };
    this.createTodo = this.createTodo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
  }

  render() {
    const todoList = this.state.todo.map((element, i) => (<Text key={element}>{element}</Text>));
    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ paddingBottom: 20 }}>To do:</Text>
        {todoList}
        <Button
          title="Create new item"
          onPress={this.toggleModal}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <TextInput
                placeholder="Enter your task"
                onChangeText={(text) => this.setState({ input: text })}
              />
              <Button
                title="Save event"
                onPress={this.createTodo}
              />
              <Button
                title="Close"
                onPress={this.toggleModal}
              />
              <Button
                title="Go home"
                onPress={() => this.props.navigation.navigate('Main')}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

    );
  }
}
