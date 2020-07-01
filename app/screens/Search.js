import React from 'react';
import { View, Text } from 'react-native';

const typeUser = "normalUse";

export default function Search() {

    if (typeUser === "normalUser") {
        return (

            <View>
                <Text>Notificaciones</Text>
            </View>
        );

    } else {
        return(
            <View>
            <Text>Notificaciones</Text>
        </View>
        )

    }
}