import React, { Component, useState, useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Input, Overlay, Button, Divider, Icon, SearchBar, FlatList } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';

import TimePicker from "react-native-24h-timepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";


const saveSchedule_api = 'http://localhost:3700/api/saveScheduleByDoctor';

export default function RequestScheduleDoctor(props) {

    const { navigation } = props;

    const [speciality, setSpeciality] = useState("");

    const [startTime, setStartTime] = useState("Desde HH:MM");
    const [endTime, setEndTime] = useState("Hasta HH:MM");
    const [duration, setDuration] = useState("Duracion en minutos")

    const [startDate, setStartDate] = useState("Desde DD-MM-AAAA");
    const [endDate, setEndDate] = useState("Hasta DD-MM-AAAA");
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    const startMark = { [startDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true } };
    const endMark = { [endDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true } };

    const toggleStartOverlay = () => { setStartVisible(!startVisible); };
    const toggleEndOverlay = () => { setEndVisible(!endVisible); };

    const handleEndTimeConfirm = (time) => {
        setEndTime(moment(time).format('HH:mm'))
        hideEndTimePicker();
    };

    const updateSpeciality = speciality => { setSpeciality(speciality); };

    let data_duration = [{
        value: '15',
    }, {
        value: '30',
    }, {
        value: '60',
    }];
    let data_specialitys = [{
        value: 'Odontologia',
    }, {
        value: 'Pediatria',
    }, {
        value: 'Apto fisico',
    }];
    let data_time = [{ value: '07:00', }, { value: '07:15', },
    {
        value: '07:30',
    }, {
        value: '07:45',
    }, {
        value: '08:00',
    }, {
        value: '08:15',
    }, {
        value: '08:30',
    }, {
        value: '08:45',
    }, {
        value: '09:00',
    }, {
        value: '09:15',
    }, {
        value: '09:30',
    }, {
        value: '09:45',
    }, {
        value: '10:00',
    }, {
        value: '10:15',
    }, {
        value: '10:30',
    }, {
        value: '10:45',
    }, {
        value: '11:00',
    }, {
        value: '11:15',
    }, {
        value: '11:30',
    }, {
        value: '11:45',
    }, {
        value: '12:00',
    }, {
        value: '12:15',
    }, {
        value: '12:30',
    }, {
        value: '12:45',
    }, {
        value: '13:00',
    }, {
        value: '13:15',
    }, {
        value: '13:30',
    }, {
        value: '13:45',
    }, {
        value: '14:00',
    }, {
        value: '14:15',
    }, {
        value: '14:30',
    }, {
        value: '14:45',
    }, {
        value: '15:00',
    }, {
        value: '15:15',
    }, {
        value: '15:30',
    }, {
        value: '15:45',
    }, {
        value: '16:15',
    }, {
        value: '16:30',
    }, {
        value: '16:45',
    }, {
        value: '17:00',
    }, {
        value: '17:15',
    }, {
        value: '17:30',
    }, {
        value: '17:45',
    }, {
        value: '18:00',
    }, , {
        value: '18:15',
    }, , {
        value: '18:30',
    }, , {
        value: '18:45',
    },
    ];

    console.log(duration);

    return (
        <View style={styles.container}>
            <View style={styles.containerData}>
                <Text style={styles.title}>Programar agenda</Text>

                <Dropdown
                    label='Especialidades y estudios'
                    data={data_specialitys}
                    containerStyle={styles.containerSearchBar}

                    onChangeText={value => setSpeciality(value)}
                />


                <View style={styles.timeContainer}>
                    <TouchableOpacity onPress={toggleStartOverlay} >
                        <Text style={styles.dateBox}>{startDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleEndOverlay} >
                        <Text style={styles.dateBox}>{endDate}</Text>
                    </TouchableOpacity>
                </View>

                 <Dropdown
                    label='Hora Desde'
                    data={data_time}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setStartTime(value)}
                />

                <Dropdown
                    label='Hora Hasta'
                    data={data_time}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setEndTime(value)}
                />

               
                <Dropdown
                    label='Duracion del turno en minutos'
                    data={data_duration}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setDuration(value)}
                />

                <Button
                    title="Agendar"
                    buttonStyle={styles.requestButtonStyle}
                    onPress={() => saveSchedule()}
                />

            </View>
            <Overlay
                isVisible={startVisible}
                onBackdropPress={toggleStartOverlay}
                overlayStyle={{ width: 400, height: 400, backgroundColor: "#f2f2f2", borderRadius: 10 }}
            >
                <Calendar
                    onDayPress={(day) => { setStartDate(day.dateString) }}
                    minDate={moment().format('YYYY-MM-DD')}
                    maxDate={moment().add(2, 'M').format('YYYY-MM-DD')}
                    markedDates={startMark}
                    markingType={'period'}
                />
                <Button title="Confirmar" onPress={toggleStartOverlay} />
            </Overlay>
            <Overlay
                isVisible={endVisible}
                onBackdropPress={toggleEndOverlay}
                overlayStyle={{ width: 400, height: 400, backgroundColor: "#f2f2f2", borderRadius: 10 }}
            >
                <Calendar
                    onDayPress={(day) => { setEndDate(day.dateString) }}
                    minDate={moment().format('YYYY-MM-DD')}
                    maxDate={moment().add(2, 'M').format('YYYY-MM-DD')}
                    markedDates={endMark}
                    markingType={'period'}
                />
                <Button title="Confirmar" onPress={toggleEndOverlay} />
            </Overlay>
        </View>
    )

    async function saveSchedule() {

        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        let dateStart = moment(startDate).format('DD-MM-YYYY');
        let dateEnd = moment(endDate).format('DD-MM-YYYY');

        if (speciality !== " "
            && dateStart !== "Invalid date"
            && dateEnd !== "Invalid date"
            && startTime !== "HH:MM"
            && endTime !== "HH:MM"
            && (duration !== "Duracion en minutos" && duration !== " ")) {
            fetch(saveSchedule_api, {
                method: 'post',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    speciality: speciality,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    timeStart: startTime,
                    timeEnd: endTime,
                    duration: duration,
                })
            }).then(response => {
                return response.json();
            }).then(responseData => {

                Alert.alert("turnos agendados correctamente");

            }).catch((error) => {
                console.log(error);
                Alert.alert("ya existen los turnos");
            });
        } else {
            Alert.alert("Todos los campos son obligatorios");
        }

    }


}


const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    containerSearchBar: {
        backgroundColor: "white",
        margin: 20,
        borderTopColor: "white",
        borderBottomColor: "white",
        width: 350,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    inputSearchContainerStyle: {
        backgroundColor: "white",
    },
    inputSearchStyle: {
        textAlign: "center",
    },
    containerData: {
        justifyContent: "center",
        alignItems: "center",
    },
    dateBox: {
        width: 170,
        fontSize: 16,
        color: "gray",
        paddingTop: 18,
        textAlign: "center",
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: "white",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    timeContainer: {
        flexDirection: "row",
    },
    timeBox: {
        width: 170,
        marginTop: 20,
        marginRight: 5,
        marginLeft: 5,
        fontSize: 16,
        paddingTop: 18,
        textAlign: "center",
        color: "gray",
        backgroundColor: "white",
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    confirmContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    requestButtonStyle: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 40,
        width: 300,
        borderRadius: 0,
        backgroundColor: "#0C9000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    containerTable: { backgroundColor: '#fff', width: 400, height: 300, },
    inputContainerSpeciality: {
        borderBottomColor: "white",

    },
    inputStyleSpeciality: {
        textAlign: "center",
        color: "gray",
        marginTop: 10,
    }



})