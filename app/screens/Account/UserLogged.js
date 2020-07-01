import React from 'react';
import { View, Text } from 'react-native';
import { Divider, Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default function UserGuest(props) {
    const {navigation} = props;
    console.log(navigation); 

    return (
        <View>
            <Text>Usuario logged</Text>
            <Button
                title="Cerrar sesion"
                onPress={() => removeItemValue(navigation)}
                
            />
        </View>
    )

    function removeItemValue(navigation) {
        try {
            AsyncStorage.removeItem('user');
            navigation.navigate("Login");
        }
        catch (exception) {
            return false;
        }
    }
}

