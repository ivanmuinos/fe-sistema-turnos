import { createStackNavigator } from 'react-navigation-stack';

import ScheduleScreen from "../screens/Schedule/Schedule";
import RequestScheduleScreen from "../screens/Schedule/RequestSchedule";
import ChangeStateScheduleScreen from "../screens/Schedule/ChangeStateSchedule";
import ScheduleConfirmScreen from "../screens/Schedule/ScheduleConfirm";

const ScheduleScreenStacks = createStackNavigator({
    Home: {
        screen: ScheduleScreen,
        navigationOptions: () => ({
            title: "Agenda",
            cardStyle:{
                backgroundColor: "white",
            }
        })
        
    },
    RequestSchedule: {
        screen: RequestScheduleScreen,
        navigationOptions: () => ({
            title: "Nuevo turno"
        })
    },
    ScheduleConfirm:{
        screen: ScheduleConfirmScreen,
        navigationOptions: () => ({
            title: "Confirmar Turno"
        })
    },
    ChangeStateSchedule:{
        screen: ChangeStateScheduleScreen,
        navigationOptions: () => ({
            title: "Gestionar turno"
        })
    }

});

export default ScheduleScreenStacks;
