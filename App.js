import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Login from './Screens/Login';
import OnboardingScreen from './Screens/Onboarding';
import TabNavigator from './Screens/TabNavigator';
import Add from './Screens/Add';
import Edit from './Screens/Edit';

const Stack = createStackNavigator();

export default class App extends React.Component { 

  componentDidMount(){
    this.askPermissionForNotifications()
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        this.setState({isFirstLaunch: true})
      }else {
        this.setState({isFirstLaunch: false})
      }
    })
  }

  askPermissionForNotifications = async () => {
    // Check for existing permissions
    const {status} = await Notifications.getPermissionsAsync()
    let finalStatus = status

    if (status !== 'granted'){
      const {status} = await Notifications.getPermissionsAsync()
      finalStatus = status
    }

    if(finalStatus !== "granted"){
      return
    }
  }

  state = {
    currentPassword:'',
    newPassword:'',
    isFirstLaunch: null
  }

  render() {

    if(this.state.isFirstLaunch === null) {
      return  null
    }else if (this.state.isFirstLaunch == true){
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal',headerBackTitle:'Back', headerBackTitleStyle:{color:'black'},headerTintColor:'black'}} headerMode='float'>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />         
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{headerShown:false}}
            />  
            <Stack.Screen
              name="Add"
              component={Add}
              options={{headerShown:false}}
            /> 
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{headerBackTitle:'Back',headerTintColor:'black'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }else {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal',headerBackTitle:'Back', headerBackTitleStyle:{color:'black'},headerTintColor:'black'}} headerMode='screen'>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{headerShown:false}}
            />        
            <Stack.Screen
              name="Add"
              component={Add}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{headerBackTitle:'Back',headerTintColor:'black'}}
            />
          </Stack.Navigator>
        </  NavigationContainer>
      );
    }
  }
}
