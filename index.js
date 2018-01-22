import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './App';
import {Router, Scene} from 'react-native-router-flux';

// Scenes
import ScreenAmountPlayer from './app/screens/ScreenAmountPlayer';
import ScreenEnterPlayerNames from './app/screens/ScreenEnterPlayerNames'; 
import PlayScreen from './app/screens/PlayScreen';

import countApp from './reducer/Reducer'
import {applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import ADD_AMOUNT_PLAYER from './app/screens/ScreenAmountPlayer';
import logger from 'redux-logger'

// Logger with default options
const store = createStore(
    countApp,
  applyMiddleware(logger)
)

export default class Index extends Component {
  render() {
    console.disableYellowBox = true;
    return (
 <Provider store={store}>
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

            <Scene
                key='playScreen'
                component={PlayScreen}
                title='PlayScreen'
                //initial
            />

        </Scene>
    </Router>
    </Provider>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('Counter10000', () => Index);