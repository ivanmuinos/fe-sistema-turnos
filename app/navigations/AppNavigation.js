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
            ),
            tabBarOptions: {
                activeTintColor: '#42a5f5',
            },
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
            ),
            tabBarOptions: {
                activeTintColor: '#42a5f5',
            },
        })
    },
    Search:{
        screen: SearchScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: "Notificaciones",
            tabBarIcon: ({tintColor}) => (
                <Icon
                type="font-awesome"
                name="bell"
                size={22}
                color={tintColor}
            />
            ),
            tabBarOptions: {
                activeTintColor: '#42a5f5',
            },
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
            ),
            tabBarOptions: {
                activeTintColor: '#42a5f5',
            },
        })
    }
});

export default createAppContainer(NavigationStacks);


