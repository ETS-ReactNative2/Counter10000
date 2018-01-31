import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import App from './App';
import { Router, Scene, Actions } from 'react-native-router-flux';

// Scenes
import ScreenAmountPlayer from './app/screens/ScreenAmountPlayer';
import ScreenEnterPlayerNames from './app/screens/ScreenEnterPlayerNames';
import PlayScreen from './app/screens/PlayScreen';
import ScreenOverview from './app/screens/ScreenOverview'
import TabsPlayScreen from './app/components/TabsPlayScreen'

//import countApp from './reducer/Reducer'
import countMainReducer from './reducer/Reducer'
import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import ADD_AMOUNT_PLAYER from './app/screens/ScreenAmountPlayer';
import logger from 'redux-logger'

// Logger with default options
const store = createStore(
    countMainReducer,
    applyMiddleware(logger)
)

const ConnectedRouter = connect()(Router);

const Scenes = Actions.create(
    <Router>
        <Scene key='root' hideNavBar>

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
                hideNavBar
            />

            <Scene
                key='playScreen'
                hideNavBar
                tabs={true}
            >

                <Scene
                    key='Play!'
                    component={PlayScreen}
                    //icon={TabsPlayScreen}
                    hideNavBar
                />

                <Scene
                    key='Overview'
                    component={ScreenOverview}
                    //icon={TabsPlayScreen}
                    hideNavBar
                />
            </Scene>

        </Scene>
    </Router>
)

export default class Index extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <ConnectedRouter scenes={Scenes} />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#de1d3e'
    },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('Counter10000', () => Index);