import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Input, Overlay, Button, Divider, Icon, SearchBar, FlatList } from 'react-native-elements';
import moment from 'moment';

const get_schedule_user_api = 'http://localhost:3700/api/getScheduleByUser';
const get_queue_api = 'http://localhost:3700/api/getQueue'

export default function HomePatient(props) {

    const { navigation } = props;

    const [schedule, setSchedule] = useState();
    const [queue, setQueue] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        getItem('user');
        getSchedulesByUser();
        getQueue();
    }, []);

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Hola {name}!</Text>
            <Text>Turnos solicitades</Text>
            {typeof schedule === "undefined" ? <Text>No tenes turnos pendientes</Text>
                : schedule.map((row, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => ChangeStateSchedule(row)}>
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

            <Text>Lista de espera</Text>
            
            {typeof queue === "undefined" ? <Text>No tenes turnos pendientes</Text>
                : queue.map((row, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => console.log("Lista de espera")}>
                            <View style={styles.cardStatusSchedule}>
                                <View>
                                    <Text>N/A</Text>
                                </View>
                                <View>
                                    <Text>N/A</Text>
                                    <Text>N/A</Text>
                                </View>
                                <View>
                                    <Text>{row.speciality}</Text>
                                    <Text>No definido</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })
            }

            <Button
                title="Solicitar nuevo turno"
                onPress={() => navigation.navigate('RequestSchedule')}
                buttonStyle={styles.requestButtonStyle}
                titleStyle={{ fontSize: 16 }}
            />

        </View>
    );

    async function getItem(key) {
        const value = await AsyncStorage.getItem(key);
        let parseValue = JSON.parse(value);

        setName(parseValue.user.name);
    }

    async function getSchedulesByUser() {
        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(get_schedule_user_api, {
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
    
    async function getQueue(){
        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(get_queue_api, {
            method: 'get',
            headers: {
                'Authorization': token
            }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setQueue(responseData.queue);
        });
    }
    function ChangeStateSchedule(row){
        if(row.state === 'Reservado'){
            navigation.navigate('ChangeStateSchedule', {
               scheduleId: row._id,
               time: row.time,
               date: row.date,
               state: row.state,
               speciality: row.speciality,
               surname: row.doctor.surname

            })
        }else{
            Alert.alert("El turno ya se encuentra confirmado")
        }
    }
}


const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        textAlign: "center",
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
    requestButtonStyle: {

        marginTop: 50,
        backgroundColor: "#e94674",
        width: 300,
        height: 60,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
});
