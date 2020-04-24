import React from 'react';
import { View, Text } from 'react-native';

const typeUser = "normalUse";

export default function Schedule() {

    if (typeUser === "normalUser") {
        return (

            <View>
                <Text>Soy un usuario y esta es la agenda</Text>
            </View>
        );

    } else {
        return(
            <View>
            <Text>Soy un medico y esta es la agenda</Text>
        </View>
       )

    }
}