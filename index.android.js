import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  WebView,
  View
} from 'react-native';
// import ImageSelected from './ImageSelected.js';
// import Classes from './Component/Classes/Classes.js'
import LoginScreen from './Component/Login/Login.js'
import Index from './Index'
// import ChatActivity from './NewChat'
export default class ClassTable extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

AppRegistry.registerComponent('ClassTable', () => ClassTable);