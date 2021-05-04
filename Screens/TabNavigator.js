import React, { Component } from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Home from './Home'
import Profile from './Profile'
import {FontAwesome, MaterialIcons} from '@expo/vector-icons'

const Tab =  createMaterialBottomTabNavigator()

export default class TabNavigator extends Component {
        render() {
                return (
                        <Tab.Navigator barStyle={{backgroundColor:'white'}} labeled={false}>
                                <Tab.Screen
                                        name="Home"
                                        component={Home}
                                        options={{
                                                tabBarIcon: () => (
                                                        <FontAwesome name="home" size={26} color="#000" />
                                                ),
                                        }}
                                />
                                <Tab.Screen
                                        name="Profile"
                                        component={Profile}
                                        options={{
                                                tabBarIcon: () => (
                                                        <FontAwesome name="user" size={26} color="#000" />
                                                ),
                                        }}
                                />
                        </Tab.Navigator>
                )
        }
}
