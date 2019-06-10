import React, { Component } from 'react';
import {
    AppRegistry, Platform, StyleSheet,
    Text, View, TextInput, Button, TouchableOpacity,
    Image, Keyboard, Alert, ScrollView, FlatList
} from 'react-native';
import { Icon, ListItem, List } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { material, human } from 'react-native-typography'

import { ADD_POINTS, SUB_POINTS, SET_POINTS } from '../../reducer/Actions';

import RNRestart from 'react-native-restart';



class PlayScreen extends Component {

    constructor(props) {
        super(props);
        // Current Player Number is ID of player
        this.state = { currentPlayerNumber: 0, points: 0, undoPoints: 0 }
    }

    onPressNext() {
        console.log("Button Next clicked")
        console.log("Current Player Number is: " + this.state.currentPlayerNumber)
        const { players, playerAmount } = this.props;
        if (this.state.currentPlayerNumber < playerAmount - 1) {
            this.setState(prevState => ({ currentPlayerNumber: prevState.currentPlayerNumber + 1 }))
        } else {
            this.setState({ currentPlayerNumber: 0 })
        }

        console.log(this.state)
        this._textInput.setNativeProps({ text: '' });
        Keyboard.dismiss()
    }

    onPressPlus() {
        console.log("Hit button plus")
        console.log("Current state " + this.state.points);
        this.props.dispatch({ type: ADD_POINTS, points: this.state.points, id: this.state.currentPlayerNumber + 1 })
        this._textInput.setNativeProps({ text: '' });
        this.checkIf10k(this.state.points);
        this.refs.flatlist.scrollToEnd({ animated: true });
    }

    onPressMinus() {
        console.log("Hit button minus")
        const { players, playerAmount } = this.props;
        if (players[this.state.currentPlayerNumber].points > 0) {
            console.log("Current points more than 0")
            if ((players[this.state.currentPlayerNumber].points - this.state.points) < 0) {
                console.log("Current points minus new points is less than 0")
                // This action sets the points on 0
                this.props.dispatch({ type: SET_POINTS, points: 0, id: this.state.currentPlayerNumber + 1 })
            } else {

                this.props.dispatch({ type: SUB_POINTS, points: this.state.points, id: this.state.currentPlayerNumber + 1 })
            }

        }
        this._textInput.setNativeProps({ text: '' });
        console.log("Current state " + this.state.points);
        this.refs.flatlist.scrollToEnd({ animated: true });
    }

    setStatePoints(newState) {
        this.setState({ points: newState }, function () {
        });
    }

    checkIf10k(newpoints) {
        const { players, playerAmount } = this.props;
        if (parseInt(players[this.state.currentPlayerNumber].points, 10) + parseInt(newpoints, 10) >= 10000) {
            // Works on both iOS and Android
            Alert.alert(
                'Won!',
                players[this.state.currentPlayerNumber].playerName + ' won the Game',
                [
                    { text: 'Last step undone!', onPress: () => this.props.dispatch({ type: SUB_POINTS, points: this.state.undoPoints, id: this.state.currentPlayerNumber + 1 }) },
                    { text: 'OK', onPress: () => this.btnWonGameOK() },
                ],
                { cancelable: false }
            )

        }

    }

    btnWonGameOK() {
        console.log("Hit Button OK");
        Actions.Overview({btnVisible: true});
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "35%",
              backgroundColor: "#CED0CE",
              marginLeft: "0%"
            }}
          />
        );
      };

    render() {
        const { players, playerAmount } = this.props;
        const pointRecord = players[this.state.currentPlayerNumber].pointRecord;

        return (
            <View style={styles.viewMain} >
                <View style={styles.viewName}>
                    <Text style={[material.display1, styles.txtName]}> {players[this.state.currentPlayerNumber].playerName} </Text>
                </View>

                <View style={styles.viewPointOverview}>
                    <Text style={[material.headline, styles.txtPointRecordHL]}> Point Record: </Text>

                    <FlatList
                        ref='flatlist'
                        data={pointRecord}
                        renderItem={({ item }) =>
                            <Text style={[material.body1, styles.txtPointRecord]}>{item}</Text>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                    />

                </View>

                <View style={styles.viewPoints}>
                    <Text style={[material.title, styles.txtPoints]}> Points: {players[this.state.currentPlayerNumber].points}</Text>
                </View>

                <View style={styles.viewInput}>

                    <View style={styles.viewMinusButton}>
                        <Icon
                            reverse
                            name='minus'
                            type='entypo'
                            color='red'
                            onPress={() => this.onPressMinus()}

                        />
                    </View>

                    <View style={styles.viewTextInput}>
                        <TextInput
                            style={styles.txtinputPoints}
                            ref={component => this._textInput = component}
                            placeholder='Points'
                            placeholderTextColor="grey"
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ points: text, undoPoints: text })}
                        />
                    </View>

                    <View style={styles.viewAddBUtton}>
                        <Icon
                            reverse
                            name='plus'
                            type='entypo'
                            color='green'
                            onPress={() => this.onPressPlus()}

                        />
                    </View>
                </View>

                <View style={styles.viewButton}>
                    <Button
                        title='Next'
                        onPress={() => this.onPressNext()}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewMain: {
        flexDirection: 'column',
        flex: 6,
    },
    viewName: {
        flex: 1,
        //height: 50,
        //backgroundColor: 'powderblue',
    },
    viewInput: {
        flexDirection: 'row',
        flex: 2,
        //backgroundColor: 'lightblue',
        justifyContent: 'space-between',
    },
    viewTextInput: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        //backgroundColor: 'red',
    },
    viewAddBUtton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //backgroundColor: 'blue',
    },
    viewMinusButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        //backgroundColor: 'green',
    },
    viewPoints: {
        flex: 1,
        //backgroundColor: 'blue',
        //justifyContent: 'space-between',
    },
    viewPointOverview: {
        flex: 7,
        //backgroundColor: 'blue',
        //justifyContent: 'space-between',
    },
    viewButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    txtPoints: {
        paddingLeft: 10,
    },
    txtPointsDynamic: {
        textAlign: 'center',
        fontSize: 30,
        padding: 10,
    },
    txtName: {
        paddingBottom: 5,
        textAlign: 'center',
    },
    addButton: {
        height: 70,
        width: 70
    },
    txtinputPoints: {
        fontSize: 25,
    },
    txtPointRecord: {
        textAlign: 'left',
        fontSize: 15,
        paddingLeft: 85,
        padding: 1,
        //fontWeight: 'bold',
    },
    txtPointRecordHL: {
        textAlign: 'left',
        //fontSize: 30,
        paddingTop: 30,
        padding: 10,
        //fontWeight: 'bold',
    },



})

// Maps the state to the local props. Therefore I can access it in these functions for example
function mapStateToProps(state) {

    return {
        playerAmount: state.number,
        players: state.playerIDs.map(id => state.player[id]) || []
    }
}

export default connect(mapStateToProps)(PlayScreen)