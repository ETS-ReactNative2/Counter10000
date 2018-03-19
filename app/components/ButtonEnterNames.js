import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ButtonEnterNames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
        }
    }
    render() {

        var myIcon =
            <Icon
                name='arrow-right'
                size={15}
                color='white'
            />


        return (
            <View>
                <Button
                    icon={
                        <Icon
                            name='arrow-right'
                            size={15}
                            color='white'
                        />}

                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={this.props.onPress}
                    title={this.props.title}

                />

            </View>
        );
    }

}


