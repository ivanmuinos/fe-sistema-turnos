import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';
import Constants from 'expo-constants';
import moment from 'moment';
import ChangeStateSchedule from '../Schedule/ChangeStateSchedule';

const get_schedule_today_api = 'http://localhost:3700/api/getTodayScheduleByDoctor';
const cancelSingleSchedule_api = 'http://localhost:3700/api/cancelSingleSchedule';

export default function HomeDoctor(props) {
    let date = moment().format('DD-MM-YYYY');
    const [schedule, setSchedule] = useState();
    const { navigation } = props;

    useEffect(() => {
        getSchedules();
    }, [schedule]);



    return (
        <ScrollView containerStyle={styles.container}>
            <Text>Bienvenido a mediturnos</Text>
            <Text style={styles.title}>Hoy {date}</Text>
            {typeof schedule === "undefined" ? <Text>No tenes turnos pendientes</Text>
                : schedule.map((row, i) => {
                    return (

                        <TouchableOpacity
                            key={i}
                            onPress={() => ChangeStateSchedule(row._id, row.date)}>
                            <View style={styles.cardStatusSchedule}>
                                <View>
                                    <Text>{row.date}</Text>
                                </View>
                                <View>
                                    <Text>{row.time}</Text>
                                    <Text>{row.state}</Text>
                                </View>
                                <View>
                                    <Text>{row.speciality}</Text>
                                    <Text>{row.doctor.surname}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }

        </ScrollView>
    );

    async function getSchedules() {

        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(get_schedule_today_api, {
            method: 'get',
            headers: {
                'Authorization': token
            }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setSchedule(responseData.schedule);
        });
    }

    function ChangeStateSchedule(scheduleId, date) {

        Alert.alert(
            "Cancelar turno",
            "Desea cancelar el turno seleccionado?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => cancelSchedule(scheduleId, date) }
            ],
            { cancelable: false }
        )
    }

    async function cancelSchedule(scheduleId, date) {
        let value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        let now = moment().format();

        let format_date_endNextWeek = moment(now).add(1, 'weeks').endOf('isoWeek');
        let format_date_1week_less2days = moment(format_date_endNextWeek).subtract(2, "days");

        let date_schedule = moment(date, 'DD-MM-YYYY').format();

        if (moment(date_schedule).isBefore(format_date_1week_less2days)
        ) {
            fetch(cancelSingleSchedule_api, {
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
                Alert.alert("turno cancelado correctamente");
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error al cancelar el turno");
            });
        }else{
            Alert.alert("Solo se puede cancelar el turno desde la semana siguiente hasta la actual");
        }

       
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
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
    title: {
        fontSize: 26,
        textAlign: "center",
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },


});