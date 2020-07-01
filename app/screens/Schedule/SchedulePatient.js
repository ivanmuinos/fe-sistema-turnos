import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Input, Overlay, Button, Divider, Icon } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';


export default function SchedulePatient(props) {
    const { navigation } = props;
    const [typeUser, setTypeUser] = useState();
    const [startDate, setStartDate] = useState("DD-MM-AAAA");
    const [endDate, setEndDate] = useState("DD-MM-AAAA");
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);
    const startMark = {[startDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true }};
    const endMark = {[endDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true }};

    const toggleStartOverlay = () => {setStartVisible(!startVisible);};
    const toggleEndOverlay = () => {setEndVisible(!endVisible);};

    useEffect(() => {
        getItem('user');
    }, []);

    async function getItem(key) {
        const value = await AsyncStorage.getItem(key);
    
        let parseValue = JSON.parse(value);
        setTypeUser(parseValue.user.role);

    }
    
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Consulta de turnos</Text>

                <View style={styles.searchContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={{ fontSize: 18 }}>Desde:</Text>
                        <TouchableOpacity onPress={toggleStartOverlay} >
                            <Text style={styles.dateBox}>{startDate}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={{ fontSize: 18 }}>Hasta:</Text>
                        <TouchableOpacity onPress={toggleEndOverlay} >
                            <Text style={styles.dateBox}>{endDate}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{height: 80, width: 80, borderRadius: 10, borderColor: "gray", borderWidth: 1, justifyContent:"center"}}>
                        <Icon
                            name='search'
                            color='black' 
                            size={50}
                            />
                    </TouchableOpacity>

                    <Overlay
                        isVisible={startVisible}
                        onBackdropPress={toggleStartOverlay}
                        overlayStyle={{width: 400, height: 400, backgroundColor: "#f2f2f2", borderRadius: 10 }}
                    >
                        <Calendar
                            onDayPress={(day) => {setStartDate(day.dateString) }}
                            minDate={'2020-06-04'}
                            maxDate={'2020-06-30'}
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
                            onDayPress={(day) => {setEndDate(day.dateString) }}
                            minDate={'2020-06-04'}
                            maxDate={'2020-06-30'}
                            markedDates={endMark}
                            markingType={'period'}
                        />
                        <Button title="Confirmar" onPress={toggleEndOverlay} />
                    </Overlay>
                </View>

                <Divider style={{ backgroundColor: "gray", marginTop: 10 }} />
                <Text style={styles.alertText}>Usted no tiene turnos agendados hasta la fecha</Text>
                <Button
                    title="Solicitar nuevo turno"
                    buttonStyle={styles.requestButtonStyle}
                    onPress={() => navigation.navigate('RequestSchedule')}

                />


            </View>
        );
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    searchContainer: {
        padding: 10,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
    },
    alertText: {
        color: "gray",
        textAlign: "center",
        marginTop: 5,
    },
    dateContainer: {
        margin: 10,
    },
    dateBox: {
        backgroundColor: "white",
        padding: 10,
        width: 120,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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


})