import React from 'react';
import { View, Text } from 'react-native';

const typeUser = "normalUse";

export default function Home() {
    if (typeUser === "normalUser") {
        return (

            <View>
                <Text>Soy un usuario y es la home</Text>
            </View>
        );

    } else {
        return (
            <View>
                <Text>Soy un medico y es la home</Text>
            </View>
        );
    }
}