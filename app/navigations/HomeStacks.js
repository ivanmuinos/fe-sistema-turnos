import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const HomeScreenStacks = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
            title: "Home"
        })
    },

},
{
    initialRouteName: 'Home'
}

);

export default HomeScreenStacks;

