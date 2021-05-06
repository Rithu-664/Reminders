import React, { Component } from 'react'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Home from './Home'
import {FontAwesome} from '@expo/vector-icons'
import RecentlyDeleted from './RecentlyDeleted'

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
                                        name="Recently Deleted"
                                        component={RecentlyDeleted}
                                        options={{
                                                tabBarIcon: () => (
                                                        <FontAwesome name='trash' size={26} color="#000" />
                                                ),
                                        }}
                                />
                        </Tab.Navigator>
                )
        }
}
