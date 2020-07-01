import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Alert } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import moment from 'moment';

const api_confirm_schedule = 'http://localhost:3700/api/confirmScheduleByUser';
const api_cancel_schedule = 'http://localhost:3700/api/cancelSchedule';


export default function ChangeStateSchedule({ navigation }) {

    const [time_calculated, setTimeCalculated] = useState();
    const [date_calculated, setDateCalculated] = useState();
    const [freeCancelation, setFreeCancelation] = useState(false);
    const [canConfirm, setCanConfirm] = useState(false);

    let { scheduleId, date, time, state, speciality, surname } = navigation.state.params;


    useEffect(() => {
        dateCalculator();

    }, []);
    

    return (
        
        <View style={styles.container}>
            <Text>Que desea hacer con su turno?</Text>
            <View style={styles.cardStatusSchedule}>
                <View>
                    <Text>{date}</Text>
                </View>
                <View>
                    <Text>{time}</Text>
                    <Text>{state}</Text>
                </View>
                <View>
                    <Text>{speciality}</Text>
                    <Text>{surname}</Text>
                </View>
            </View>
            <Text>Recuerde que:</Text>
            <Text>* Debe confirmar su asistencia desde 12 horas hasta 1 hora antes</Text>
            <Text>* La cancelación del turno hasta 12 horas antes del mismo es sin cargo, pasado ese tiempo
                se le generará un cargo en su cuenta corriente
            </Text>

            {freeCancelation ? 
                 <Text>Cancelacion gratuita hasta el {date_calculated} a las {time_calculated}hs </Text>
                             :
                 <Text>Si cancela el turno tendrá un cargo en su cuenta corriente</Text>
            }
           
           {canConfirm ? 
                <Button
                title="Confirmar Asistencia"
                onPress={() => confirmSchedule()}
                 />
                       :
                <Text>Usted podrá confirmar su asistencia el día xxx a las xxxx</Text>
            }
            
            <Button
                title="Cancelar turno"
                onPress={() => cancelSchedule()}
            />
        </View>
    )

    async function confirmSchedule() {
        let value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(api_confirm_schedule, {
            method: 'put',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                schedule: scheduleId,
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            Alert.alert("Turno confirmado");
            navigation.navigate("Home");
        }).catch((error) => {
            Alert.alert("Error al confirmar el turno");
        });
    }

    async function cancelSchedule() {
        let value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(api_cancel_schedule, {
            method: 'put',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                schedule: scheduleId,
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            Alert.alert("Turno cancelado");
            navigation.navigate("Home");
        }).catch((error) => {
            console.log(error);
            Alert.alert("Error al cancelar el turno");
        });
    }

    function dateCalculator() {
        let parse_date = moment(date, 'DD-MM-YYYY').toDate();
        let parse_full_date = moment((moment(parse_date).format('YYYY-MM-DD') + " " + time));
        let parse_full_date1 = moment((moment(parse_date).format('YYYY-MM-DD') + " " + time));
        let date_time_calculated = parse_full_date.subtract(moment.duration("12:00:00")).format();
        let date_time_calculated_1 = parse_full_date1.subtract(moment.duration("01:00:00")).format(); 

        let now = moment().format();

        setDateCalculated(moment(date_time_calculated).format('DD-MM-YYYY'));
        setTimeCalculated(moment(date_time_calculated).format('HH:mm'));
        setFreeCancelation(moment(now).isBefore(date_time_calculated));
        setCanConfirm(moment(now).isAfter(date_time_calculated) && moment(now).isBefore(date_time_calculated_1));
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardStatusSchedule: {
        marginTop: 20,
        width: 350,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: "#bce1e1",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",

    },
})