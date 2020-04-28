import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Buttom } from 'react-native-elements';

export default function UserGuest(){
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Text>Cuenta del usuario</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    }
})

