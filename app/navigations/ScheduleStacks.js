import { createStackNavigator } from 'react-navigation-stack';
import ScheduleScreen from "../screens/Schedule";

const ScheduleScreenStacks = createStackNavigator({
    Home: {
        screen: ScheduleScreen,
        navigationOptions: () => ({
            title: "Schedule"
        })
    }
});

export default ScheduleScreenStacks;
