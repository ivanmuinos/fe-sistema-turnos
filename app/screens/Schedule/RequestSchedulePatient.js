import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Alert, ScrollView } from 'react-native';
import { Input, Overlay, Button, Divider, Icon, SearchBar, FlatList } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';

import TimePicker from "react-native-24h-timepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";


const get_schedules_api = 'http://localhost:3700/api/getSchedules';
const get_next_schedules_api = 'http://localhost:3700/api/getNextAvailableSchedule';
const save_queue_api = 'http://localhost:3700/api/saveQueue';

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
let data_profesional = [{
    value: '',
}, {
    value: 'Muiños',
}, {
    value: 'Rodriguez',
}, {
    value: 'Ruben',
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


export default function RequestSchedulePatient(props) {

    const { navigation } = props;

    const [speciality, setSpeciality] = useState(" ");
    const [nextScheduleAvailable, setNextScheduleAvailable] = useState(false);
    const [queue, setQueue] = useState(false);

    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const [startDate, setStartDate] = useState("Ingrese fecha");

    const [profesional, setProfesional] = useState();

    const [startVisible, setStartVisible] = useState(false);

    const [schedule, setSchedule] = useState([]);

    const [selectedItems, setSelectedItems] = useState();

    const startMark = { [startDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true } };

    const toggleStartOverlay = () => { setStartVisible(!startVisible); };

    const updateSpeciality = speciality => {
        setSpeciality(speciality);
    };

    console.log(nextScheduleAvailable);
    return (
        <ScrollView containerStyle={styles.container}>
            <View style={styles.containerData}>
                <Text style={styles.title}>Solicitud de turno</Text>

                <Dropdown
                    label='Especialidades y estudios'
                    data={data_specialitys}
                    containerStyle={styles.containerSearchBar}

                    onChangeText={value => setSpeciality(value)}
                />
                <TouchableOpacity onPress={toggleStartOverlay} >
                    <Text style={styles.dateBox}>{startDate}</Text>
                </TouchableOpacity>

                <Dropdown
                    label='Hora Desde'
                    data={data_time}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setStartTime(value)}
                    value={startTime}
                />

                <Dropdown
                    label='Hora Hasta'
                    data={data_time}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setEndTime(value)}
                    value={endTime}
                />


                <Dropdown
                    label='Profesional'
                    data={data_profesional}
                    containerStyle={styles.containerSearchBar}
                    onChangeText={value => setProfesional(value)}
                />

                <View style={styles.confirmContainer}>
                    <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 10, borderColor: "gray", borderWidth: 1, justifyContent: "center" }}
                        onPress={() => getSchedules()}
                    >
                        <Icon
                            name='search'
                            color='black'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                {
                    queue ? <View>
                        <Text>No hay turnos u horarios disponibles para la fecha seleccionada</Text>
                        <Text>Desea agregarse en lista de espera?</Text>
                        <Button
                            title="lista de espera"
                            onPress={() => saveQueue()}
                        />
                    </View> : <Text></Text>
                }
                {
                    nextScheduleAvailable ? <View>
                        <Text>No hay turnos u horarios disponibles para la fecha seleccionada</Text>
                        <Text>Sin embargo, el proximo turno disponible es el:</Text>
                    </View> : <Text></Text>
                }
                {schedule.length != 0 ? <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Fecha</DataTable.Title>
                        <DataTable.Title>Hora</DataTable.Title>
                        <DataTable.Title>Especialidad</DataTable.Title>
                        <DataTable.Title>Profesional</DataTable.Title>
                    </DataTable.Header>
                    {
                        schedule.map((row, i) => {

                            return (
                                <DataTable.Row
                                    key={i}
                                    onPress={() => navigation.navigate('ScheduleConfirm', {
                                        scheduleId: row._id,
                                        date: row.date,
                                        time: row.time,
                                        speciality: row.speciality,
                                        doctor: row.doctor.surname
                                    })}
                                >
                                    <DataTable.Cell>{row.date}</DataTable.Cell>
                                    <DataTable.Cell>{row.time}</DataTable.Cell>
                                    <DataTable.Cell>{row.speciality}</DataTable.Cell>
                                    <DataTable.Cell>{row.doctor.surname}</DataTable.Cell>
                                </DataTable.Row>
                            );
                        })
                    }


                </DataTable> : <Text></Text>
                }


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

        </ScrollView>
    )

    async function getSchedules() {

        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        console.log(speciality);
        console.log(startDate);
        console.log(startTime);
        console.log(endTime);
        console.log(profesional);

        if (startDate !== "Ingrese fecha" &&
            typeof startDate !== "undefined" &&
            startDate != " " &&
            typeof startTime !== "undefined" &&
            startTime != " " &&
            typeof endTime !== "undefined" &&
            endTime != " "
        ) {
            fetch(get_schedules_api + "/" + speciality + "/" + startDate + "/" + startTime + "/" + endTime + "/" + profesional, {
                method: 'get',
                headers: {
                    'Authorization': token
                }
            }).then(response => {
                return response.json();
            }).then(responseData => {
                if (responseData.schedule.length === 0) {
                    getNextAvailableSchedule();
                } else {
                    setSchedule(responseData.schedule);
                }
            });

        } else {
            Alert.alert("Todos los campos son obligatorios")
        }

    }

    async function getNextAvailableSchedule() {
        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        setStartTime(" ");
        setEndTime(" ");
        setStartDate(" ");
        console.log("pasa x aca");
        fetch(get_next_schedules_api + "/" + speciality + "/" + profesional, {
            method: 'get',
            headers: {
                'Authorization': token
            }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            if (responseData.schedule.length === 0) {
                setQueue(true);
            } else {
                setNextScheduleAvailable(true);
                setSchedule(responseData.schedule);
            }
        });
    }

    async function saveQueue() {
        const value = await AsyncStorage.getItem('token');
        let parseValue = JSON.parse(value);
        let token = parseValue.token;

        fetch(save_queue_api, {
            method: 'post',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                speciality: speciality,
            })
        }).then(response => {
            return response.json();
        }).then(responseData => {
            console.log(responseData);
        }).catch((error) => {
            console.log(error);
            Alert.alert("Ya estas en cola de espera para esta especialidad");
        });
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
        width: 350,
        fontSize: 18,
        color: "gray",
        paddingTop: 18,
        textAlign: "center",
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
        fontSize: 18,
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
        width: 300,
        flexDirection: "row",
        marginTop: 15,
    },
    requestButtonStyle: {
        marginLeft: 30,
        marginTop: 20,
        width: 200,
        borderRadius: 0,
        backgroundColor: "#1C3BAB",
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
    sContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    sTextItem: {
        height: 50,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18
    },
    sSearchBar: {
        paddingHorizontal: 10,
        margin: 10,
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 18
    },
    inputContainerSpeciality: {
        borderBottomColor: "white",

    },
    inputStyleSpeciality: {
        textAlign: "center",
        color: "gray",
        marginTop: 10,
    }




})

