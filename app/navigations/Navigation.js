import React from 'react';

import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreenStacks from './HomeStacks';
import AccountScreenStacks from './AccountStacks';
import SearchScreenStacks from './SearchStacks';
import ScheduleScreenStacks from './ScheduleStacks';

const NavigationStacks = createBottomTabNavigator({
    Home:{
        screen: HomeScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    type="material-community"
                    name="home"
                    size={22}
                    color={tintColor}
                />
            )
        })
    },
    Search:{
        screen: SearchScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Buscar",
            tabBarIcon: ({tintColor}) => (
                <Icon
                type="font-awesome"
                name="search"
                size={22}
                color={tintColor}
            />
            )
        })
    },
    Schedule:{
        screen: ScheduleScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Agenda",
            tabBarIcon: ({tintColor}) => (
                <Icon
                type="material-community"
                name="calendar-clock"
                size={22}
                color={tintColor}
            />
            )
        })
    },
    Account:{
        screen: AccountScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Cuenta",
            tabBarIcon: ({tintColor}) => (
                <Icon
                    type="material-community"
                    name="account"
                    size={22}
                    color={tintColor}
                />
            )
        })
    }
});

export default createAppContainer(NavigationStacks);


