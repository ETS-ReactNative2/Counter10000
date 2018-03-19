import React, { Component } from 'react';
import { Slider } from 'react-native-elements';
import {View, Text} from 'react-native';


export default class SliderAmountPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
        }
    }

    

    render() {

        return (

            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.props.value}
                    onValueChange={this.props.onValueChange} 
                    minimumValue={2}
                    maximumValue={8}
                    step={1}
                    
                    />
                <Text>Value: {this.props.value}</Text>
            </View>

        );
    }



}