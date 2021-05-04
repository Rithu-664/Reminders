import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import db from '../Config/Firebase'

export default class Home extends Component {

        onSignOut = () => {
                db.auth().signOut()
                .then(() => {
                        this.props.navigation.replace('Login')
                })
        }

        render() {
                return (
                        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                                <StatusBar hidden/>
                                
                                <View style={styles.headerStyle}>
                                        <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                                                <Image source={require('../assets/sticky-notes.png')} style={{width:50,height:50,marginLeft:20}} />
                                                <Text style={{fontSize:25,fontWeight:'bold',color:'#212121',marginLeft:10}} >Reminders</Text>
                                        </View>
                                        <View style={{margin:10,flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:100}}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Add')}>
                                                        <AntDesign name="plus" size={32} color="#212121" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.onSignOut()}>
                                                        <MaterialIcons name="logout" size={32} color="#212121" />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        </SafeAreaView>
                )
        }
}

const styles = StyleSheet.create({
        headerStyle: {
                height:70,
                backgroundColor:'white',
                shadowOpacity:0.5,
                shadowOffset:{width:0,height:5},
                shadowColor:'black',
                flexDirection:'row',
                justifyContent:'space-between',
        },
})
