import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { View, Text, AsyncStorage } from 'react-native';
import Loading from '../../components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';


export default function Account(props) {

    const {navigation} = props;
    const [login, setLogin] = useState(null);

    useEffect(() => {
         getItem('user');
    }, []);

    if (login === null) {
        return <Loading isVisible={true} text="Cargando..." />
    }

    return login ? <UserLogged navigation={navigation}/> : <UserGuest />;

    async function getItem(key) {
        const value = await AsyncStorage.getItem(key);
        setLogin(true);
    }
    
}