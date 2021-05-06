import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import {ListItem,Avatar,Badge} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import {AntDesign, MaterialIcons} from '@expo/vector-icons'
import db from '../Config/Firebase'

var title
export default class Home extends Component {

        constructor(){
                super()
                
                this.state = {
                        reminders:[],
                        imageUri:''
                }

                this.reminder = null
        }

        onSignOut = () => {
                db.auth().signOut()
                .then(() => {
                        this.props.navigation.replace('Login')
                })
        }

        componentDidMount = async () => {
                this.reminder = await db
                  .firestore()
                  .collection('Reminders')
                  .where('userEmail', '==', db.auth().currentUser.email)
                  .onSnapshot((snapshot) => {
                    var docData = snapshot.docs.map((document) => document.data());
                    this.setState({
                      reminders: docData,
                    });
                  });
        };

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


                                <FlatList
              data={this.state.reminders}
              style={{ marginTop: 10 }}
              renderItem={({ item }) => {
                      return(
                
                        <ListItem>
                                <ListItem.Content
                                        style={{
                                        backgroundColor: item.backgroundColor,
                                        padding: 20,
                                        borderRadius: 20,
                                        }}
                                >
                                <View style={{ flexDirection: 'row' }}>
                                        <View>
                                                <Avatar
                                                        rounded
                                                        icon={{ name: item.icon, type: item.iconType }}
                                                        activeOpacity={0.7}
                                                        source={{
                                                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                                                        }}
                                                />
                                        </View>
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                        <ListItem.Subtitle right>{item.description}</ListItem.Subtitle>
                                        <ListItem.Subtitle right>{item.dateAndTime}</ListItem.Subtitle>
                                </View>
                                
                                </View>
                                </ListItem.Content>
                      </ListItem>
                         
                    )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
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
