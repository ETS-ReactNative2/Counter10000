import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import Amount from '../components/AmountPlayerScreen/Amount';
import { ADD_PLAYER_NAME } from '../../reducer/Reducer'
import PropTypes from 'prop-types';



export default class SceenOverview extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'SceenOverview',
  };



  render() {
    return (
        <View>
            <Text> OVERVIEW SCREEN </Text>
        </View>
      
    );
  }
}

