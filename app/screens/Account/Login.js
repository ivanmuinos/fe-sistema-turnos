import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Alert} from 'react-native';
import { Divider, Button, Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { SecureStore } from 'expo';

const login_api = 'http://localhost:3700/api/login';

export default function Login(props) {
    const { navigation } = props;
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    
    return (
        <ScrollView>
            <View style={styles.viewContainer}>
                <Text>SGT</Text>
                <Text>Sistema de gestión de turnos.</Text>

            </View>

            <Image
                source={require("../../../assets/img/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.viewContainer}>
                <Input
                    onChangeText={(text) => setUser(text.toLowerCase())}
                    placeholder="Email" />
                <Input
                    onChangeText={(text) => setPwd(text)}
                    placeholder="Contraseña" />
                <Button
                    title="Iniciar Sesión"
                    onPress={() => loginAccount(user, pwd, navigation)}
                />
        
                <CreateAccount navigation={navigation} />

            </View>
            <Divider style={styles.divider} />
        </ScrollView>
    );

    
}

async function getItem(key){
    const value = await AsyncStorage.getItem(key);
}

function loginAccount(user, pwd, navigation){
    fetch(login_api, {
        method: 'post',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: pwd,
            email: user,
            gettoken: true,
        })
    }).then(response => {
        return response.json();
    }).then(responseData => {
            try {
                 AsyncStorage.setItem("token", JSON.stringify(responseData));
                 getItem('token');
                 getDataUser(user, pwd, navigation);
             } catch (error) {
                 Alert.alert('Error', 'There was an error.')
             }

         
    }).catch((error) => {
        Alert.alert("Email o contraseña incorrectas");
    });
}
function getDataUser(user, pwd, navigation) {

    fetch(login_api, {
        method: 'post',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: pwd,
            email: user,
            gettoken: false,
        })
    }).then(response => {
        return response.json();
    }).then(responseData => {
            try {
                 AsyncStorage.setItem("user", JSON.stringify(responseData));
                 getItem('user');
                 
                 navigation.navigate("Home");
             } catch (error) {
                 Alert.alert('Error', 'There was an error.')
             }
         
    }).catch((error) => {
        Alert.alert("Email o contraseña incorrectas");
    });


}

function CreateAccount(props) {
    const { navigation } = props;

    return (
        <Text style={styles.textRegister}>
            ¿No tenes cuenta? {" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Register")}
            >
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginTop: 20,
        marginRight: 40,
        marginLeft: 40
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: 'bold'
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    }
})