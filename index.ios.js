import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
    } from 'react-native';
import App from './App.js'
//import Login from './Login.js'
export default class ClassTable extends Component {
    render() {
        return (
            <App />
        );
    }
}

AppRegistry.registerComponent('ClassTable', () => ClassTable);
