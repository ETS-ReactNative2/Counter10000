import React, { Component } from 'react';
import {AppRegistry, Platform,  StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux'

import Amount from '../components/AmountPlayerScreen/Amount';


 class ScreenEnterPlayerNames extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Player Names',
  };


  render() {

    console.log(this.props.navigation.state.params.am);
    const {playerAmount} = this.props;
    var textBoxes = [];
    for(var i=0; i<playerAmount; i++) {
      var placeholderText = 'Player ' + (i+1);
      textBoxes.push(
          <TextInput
            placeholder={placeholderText}
            placeholderTextColor="grey"
          > 
          </TextInput>
    
      );
    }
    


    return (
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={styles.TxtHeading}>
            Please enter the names in sequence.
          </Text>
        </View>
        <ScrollView style={styles.viewTextBox}>
          {textBoxes}
        </ScrollView>

        <View style={styles.viewButton}>
          <Button          
          title='Start the Game!'/>
        </View>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'column',
    flex:7,
  },
  viewTxt: {
    //flex:0.5,
    height: 50,
    //backgroundColor: 'red',
    justifyContent: 'center',
  },
  TxtHeading: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  viewTextBox: {
    flex: 5,
    backgroundColor: 'grey',
  },
  viewButton: {
    //flex: 0.5,
    //backgroundColor: 'blue',
    height:100,
    justifyContent:'center',
  },
  viewTextBox: {
    flexDirection: 'column',
    flex: 5
  },

})

function mapStateToProps(state) {

  return {
    playerAmount:state.number
	}
}



export default connect(mapStateToProps)(ScreenEnterPlayerNames)