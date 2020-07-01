import React, { Component, useState, useEffect } from 'react';
import {AsyncStorage} from 'react-native';
import RequestScheduleDoctor from './RequestScheduleDoctor';
import RequestSchedulePatient from './RequestSchedulePatient';


export default function Schedule(props) {
    const { navigation } = props;
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
        return  <RequestScheduleDoctor/> 
    } else {
        return <RequestSchedulePatient navigation={navigation}/>
    }
}
