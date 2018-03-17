import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
import App from './App';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

// Scenes
import ScreenAmountPlayer from './app/screens/ScreenAmountPlayer';
import ScreenEnterPlayerNames from './app/screens/ScreenEnterPlayerNames';
import PlayScreen from './app/screens/PlayScreen';
import ScreenOverview from './app/screens/ScreenOverview';
import TabsPlayScreen from './app/components/TabsPlayScreen';

//import countApp from './reducer/Reducer'
import countMainReducer from './reducer/Reducer';
import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import ADD_AMOUNT_PLAYER from './app/screens/ScreenAmountPlayer';
import logger from 'redux-logger'

// React Navigation
import { StackNavigator } from 'react-navigation';

// Logger with default options
const store = createStore(
    countMainReducer,
    applyMiddleware(logger)
)

const ConnectedRouter = connect()(Router);

class TabIcon extends React.Component {
    render() {
        //var color = this.props.selected ? '#FF3366' : '#FFB3B3'
        //style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}
        return (
            <View >
                <Icon
                    size={30}
                    name={this.props.iconName} />
            </View>
        )
    }
}

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
                    icon={TabIcon}
                    iconName={'play-circle-o'}
                    hideNavBar
                />

                <Scene
                    key='Overview'
                    iconName={'list-ul'}
                    icon={TabIcon}
                    component={ScreenOverview}
                    hideNavBar
                />

            </Scene>

        </Scene>
    </Router>
)

class Index extends Component {
    render() {
        console.disableYellowBox = false;
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

export default Index;
AppRegistry.registerComponent('Counter10000', () => Index);