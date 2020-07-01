import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../screens/Home/Home";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

import RequestScheduleScreen from "../screens/Schedule/RequestSchedule";
import ScheduleConfirmScreen from "../screens/Schedule/ScheduleConfirm";
import ChangeStateScheduleScreen from "../screens/Schedule/ChangeStateSchedule";

const HomeScreenStacks = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            title: "Home",
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

},
{
    initialRouteName: 'Home'
}

);

export default HomeScreenStacks;

