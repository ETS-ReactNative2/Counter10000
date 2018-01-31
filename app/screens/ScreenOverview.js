import React, { Component } from 'react';
import {
  AppRegistry, Platform, StyleSheet,
  Text, View, TextInput, Button, ScrollView, Keyboard, FlatList, SectionList,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { List, ListItem } from "react-native-elements";

import Amount from '../components/AmountPlayerScreen/Amount';
import { ADD_PLAYER_NAME, SET_PLACE } from '../../reducer/Actions'
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
    const playersArray = [];
    const sortedPlayers = [];


    // Save all players in array doesn't matter if they have points or not 
    for (var i = 0; i < playerAmount; i++) {
      sortedPlayers.push(players[i]);
    }

    for (var i = 0; i < playerAmount; i++) {
      // Look for Max 
      var max = i;
      for (var j = i; j < playerAmount; j++) {
        if (sortedPlayers[j].points > sortedPlayers[max].points) {
          max = j;
        }
        var tmp = sortedPlayers[i];
        sortedPlayers[i] = sortedPlayers[max];
        sortedPlayers[max] = tmp;

      }
    }

    for (var i = 0; i < playerAmount; i++) {
      sortedPlayers[i].numberOfBest = i + 1;
    }


    return (
      <View style={styles.view}>
        <List>
          <FlatList
            data={sortedPlayers}
            renderItem={({ item }) => (
              <ListItem
                hideChevron
                avatar= {require('../../img/avatar/1.png')}
                roundAvatar
                title={item.numberOfBest + ". " +
                  item.playerName}
                rightTitle={String(item.points)}
                rightTitleStyle={{ fontSize: 20, }}
                titleStyle={{ fontSize: 20, }}
              />
            )}
          />
        </List>
      </View>
    );


  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 30,
    padding: 10,
  },
  text: {
    flex: 1,
    fontSize: 30,
  },
})

// Maps the state to the local props. Therefore I can access it in these functions for example
function mapStateToProps(state) {

  return {
    playerAmount: state.number,
    players: state.playerIDs.map(id => state.player[id]) || []
  }
}

export default connect(mapStateToProps)(SceenOverview)