import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage} from 'react-native';
import HomeDoctor from './HomeDoctor';
import HomePatient from './HomePatient';

export default function Home(props) {
    const {navigation} = props;
    const [typeUser, setTypeUser] = useState();

    useEffect(() => {
        getItem('user');
    }, []);

    async function getItem(key) {
        const value = await AsyncStorage.getItem(key);
        let parseValue = JSON.parse(value);
        setTypeUser(parseValue.user.role);
    }

    if (typeUser === "doctor") {
        return <HomeDoctor navigation={navigation}/>
    } else {
        return <HomePatient navigation={navigation}/>
    }
}