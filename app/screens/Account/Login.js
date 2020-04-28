import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider, Button } from 'react-native-elements';


export default function Login(props) {
    const { navigation } = props;

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
                <Button 
                    title="Iniciar Sesión"
                    onPress={() => navigation.navigate("Home")}
                />
                <CreateAccount navigation={navigation}/>
        
            </View>

            <Divider style={styles.divider} />


        </ScrollView>

    );
}


function CreateAccount(props){
    const { navigation } = props;

    return(
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