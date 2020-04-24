import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from "../screens/Search";

const SearchScreenStacks = createStackNavigator({
    Home: {
        screen: SearchScreen,
        navigationOptions: () => ({
            title: "Search"
        })
    }
});
export default SearchScreenStacks;

