import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Input, Overlay, Button, Divider, Icon, Image } from 'react-native-elements';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment';

export default function Schedule(props) {
    const { navigation } = props;

    const [typeUser, setTypeUser] = useState();
    const [startDate, setStartDate] = useState("DD-MM-AAAA");
    const [endDate, setEndDate] = useState("DD-MM-AAAA");
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);
    const startMark = { [startDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true } };
    const endMark = { [endDate]: { disabled: true, startingDay: true, color: 'green', endingDay: true } };

    const toggleStartOverlay = () => { setStartVisible(!startVisible); };
    const toggleEndOverlay = () => { setEndVisible(!endVisible); };

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
            {
                (typeUser === "doctor") ? (
                    <View>
                        <View style={styles.timeContainer}>
                            <TouchableOpacity onPress={toggleStartOverlay} >
                                <Text style={styles.dateBox}>{startDate}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleEndOverlay} >
                                <Text style={styles.dateBox}>{endDate}</Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Buscar"
                        />

                    </View>

                ) : (<Button
                    title="Solicitar turno"
                    buttonStyle={styles.requestButtonStyle}
                    onPress={() => navigation.navigate('RequestSchedule')}

                />)
            }
            <TouchableOpacity
                onPress={() => navigation.navigate('RequestSchedule')}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    position: 'absolute',
                    bottom: 30,
                    right: 30,
                    height: 100,
                    backgroundColor: 'pink',
                    borderRadius: 100,
                }}
            >
                <Icon name="plus" type='font-awesome' size={50} color="#01a699" />
            </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 0,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
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

