import React from 'react';
import { View, Text } from 'react-native';

const typeUser = "normalUse";

export default function Search() {

    if (typeUser === "normalUser") {
        return (

            <View>
                <Text>Soy un usuario y este es el buscador</Text>
            </View>
        );

    } else {
        return(
            <View>
            <Text>Soy un medico y este es el buscador</Text>
        </View>
        )

    }
}