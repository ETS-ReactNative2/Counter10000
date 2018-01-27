import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, 
Text, View, TextInput, Button, ScrollView, Keyboard, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { List, ListItem } from "react-native-elements";

import Amount from '../components/AmountPlayerScreen/Amount';
import { ADD_PLAYER_NAME } from '../../reducer/Reducer'
import PropTypes from 'prop-types';



class SceenOverview extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Overview',
  };



  render() {
    const { players, playerAmount } = this.props;
    const sortedPlayers = [];


    // Save all players in array doesn't matter if they have points or not 
    for (var i = 0; i < playerAmount; i++) {
      sortedPlayers.push(players[i]);
      console.log("Add to Array: " + players[i]);
    }
    /*
    // Sort 
    for (var i = 0; i < playerAmount; i++) {
      for (var j = playerAmount - 2; j <= i; j--) {
        if (sortedPlayers[j].points > sortedPlayers[j + 1].points) {
          var tmp = sortedPlayers[j];
          sortedPlayers[j] = sortedPlayers[j + 1];
          sortedPlayers[j + 1] = tmp;
        }
      }
    }
*/
    var textBoxes = [];

    for (var i = 0; i < playerAmount; i++) {
      const key = i + 1;
      console.log("Pushed into Players Array: " + sortedPlayers[i].playerName);
      textBoxes.push(
        <Text
          key={key}
        >{key + '.' + sortedPlayers[i].playerName + '\n'}
        </Text>


      );
    }

    return (
      <FlatList
        data={sortedPlayers}
        renderItem={({ item }) => <Text>{item.playerName}</Text>}
      />

    );
  }
}

// Maps the state to the local props. Therefore I can access it in these functions for example
function mapStateToProps(state) {

  return {
    playerAmount: state.number,
    players: state.playerIDs.map(id => state.player[id]) || []
  }
}

export default connect(mapStateToProps)(SceenOverview)