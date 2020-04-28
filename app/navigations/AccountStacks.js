import { createStackNavigator } from 'react-navigation-stack';
import AccountScreen from "../screens/Account/Account";

const AccountScreenStacks = createStackNavigator({
    Home: {
        screen: AccountScreen,
        navigationOptions: () => ({
            title: "Account"
        })
    }
});

export default AccountScreenStacks;

