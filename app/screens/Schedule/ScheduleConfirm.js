import React from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Overlay, Button, Divider, Icon } from 'react-native-elements';


const api_confirmSchedule = 'http://localhost:3700/api/saveScheduleByUser';

export default function ScheduleConfirm({ navigation }) {
    const { scheduleId, date, doctor, speciality, time} = navigation.state.params;

    return (
        <View style={styles.containerScheduleConfirm}>
            <Text style={styles.title}>¿Esta seguro que desea solicitar el siguiente turno?</Text>
            <Divider/>
            <View style={{margin: 10}}>
                <View style={styles.containerInfoSchedule}>
                    <Text>Fecha</Text><Text>Hora</Text><Text>Especialidad</Text><Text>Profesional</Text>
                </View>
                <View style={styles.containerInfoSchedule}>
                    <Text>{date}</Text><Text>{doctor}</Text><Text>{speciality}</Text><Text>{time}</Text>
                </View>
            </View>
            <Divider/>
            <Button
                title="Confirmar turno"
                onPress={() => confirmSchedule()}
            />
        </View>
    );

    async function confirmSchedule(){

        let value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;
        console.log(scheduleId);
        fetch(api_confirmSchedule, {
            method: 'put',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                schedule: scheduleId,
                speciality: speciality,
                date: date,
                time: time,
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
           Alert.alert("Turno reservado correctamente")
        }).catch((error) => {
            Alert.alert("Ya tenes un turno reservado el día " + date + " para la especialidad " + speciality);
        });
}
}

const styles = StyleSheet.create({
    containerScheduleConfirm: {
        margin: 10,

    },
    containerInfoSchedule: {
        flexDirection: 'row',
    },
    title:{
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
        color: "gray",

    }
});


