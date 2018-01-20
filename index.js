import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './App';
import {Router, Scene} from 'react-native-router-flux';

import ScreenAmountPlayer from './app/screens/ScreenAmountPlayer';
import ScreenEnterPlayerNames from './app/screens/ScreenEnterPlayerNames'; 

import { createStore } from 'redux';
import countApp from './reducer/Reducer';

import ADD_AMOUNT_PLAYER from './app/screens/ScreenAmountPlayer';

let store = createStore(countApp)

console.log('Current State: ' + store.getState())

const unsubscribe = store.subscribe(() =>
  console.log("Store State in Subscribe: " + store.getState())
)

store.dispatch(ADD_AMOUNT_PLAYER(5))

unsubscribe()

export default class Index extends Component {
  render() {
    return (
    <Router>
        <Scene key='root'>

            <Scene 
                key='amount'
                component={ScreenAmountPlayer}
                title='AmountOfPlayer'
                initial
            />

            <Scene 
                key='names'
                component={ScreenEnterPlayerNames}
                title='EnterNames'
            />

        </Scene>
    </Router>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('Counter10000', () => Index);