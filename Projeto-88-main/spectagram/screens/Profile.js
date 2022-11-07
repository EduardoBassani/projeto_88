import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';

export default class Profile extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Switch
                trackColor={{
                  false: "#767577",
                  true: this.state.light_theme ? "#eee" : "white"
                }}
                thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"} 
              />
                <Text>Perfil</Text>
            </View>
        )
    }
}