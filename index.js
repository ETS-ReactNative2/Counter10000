import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
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

// React Navigation
import { StackNavigator } from 'react-navigation';

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

class Index extends Component {
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

export default Index;
AppRegistry.registerComponent('Counter10000', () => Index);


// Test React Navigator



// Test not finished
/*
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen TEST</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>DetailsScreen</Text>
            </View>
        );
    }
}

const Counter10000 = StackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
});



// For testing on
export default StackNavigator;

//Just Testing
AppRegistry.registerComponent('Counter10000', () => Counter10000);

*/