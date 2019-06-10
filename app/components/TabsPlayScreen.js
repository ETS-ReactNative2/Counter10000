import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';


export default class TabsPlayScreen extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}