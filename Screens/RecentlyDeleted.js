import React, { Component } from 'react'
import { View, TouchableOpacity,StyleSheet,Image,Text, SafeAreaView, FlatList, Alert } from 'react-native'
import {AntDesign, MaterialIcons,Entypo} from '@expo/vector-icons'
import {ListItem, Avatar} from 'react-native-elements'
import db from '../Config/Firebase'
import theme from '../Props/theme'

export default class RecentlyDeleted extends Component {

       constructor(){
               super()

               this.state = {
                        recentlyDeleted:[]
                }

                this.recentlyDeleted = null
       }

        componentDidMount() {
                this.recentlyDeleted = db
                  .firestore()
                  .collection('Recently Deleted')
                  .where('userEmail', '==', db.auth().currentUser.email)
                  .onSnapshot((snapshot) => {
                    var docData = snapshot.docs.map((document) => document.data());
                    this.setState({
                      recentlyDeleted: docData,
                    });
                  });
        }

        showAlert(details) {
                var docID
                Alert.alert('Recover or Delete forever?','Do you want to recover or delete this reminder (cannot be undone)',[
                        {text:'Cancel',style:'cancel'},
                        {text:'Recover',style:'default',onPress:() => this.recover(docID,details)},
                        {text:'Delete',style:'destructive',onPress:() => this.delete(docID)},
                ])
                db.firestore().collection('Recently Deleted').where('title','==',details.title).onSnapshot((snapshot) => {
                        var docData = snapshot.docs.map((document) => 
                                {docID = document.id
                                }
                        )    
                })
        }

        delete(docID) {
                db.firestore().collection('Recently Deleted').doc(docID).delete()
        }

        recover(docID,details) {
                db.firestore().collection('Recently Deleted').doc(docID).delete().then(() => {
                        db.firestore().collection('Reminders').add({
                                title: details.title,
                                description:details.description,
                                dateAndTime:details.dateAndTime,
                                timeNotificationShouldBeSent:details.timeNotificationShouldBeSent === '' ? '5 minutes' : details.timeNotificationShouldBeSent,
                                userEmail: db.auth().currentUser.email,
                                backgroundColor:details.backgroundColor,
                                icon:details.icon,
                                iconType:details.iconType
                        })
                })
        }

        onSignOut = () => {
                db.auth().signOut()
                .then(() => {
                        this.props.navigation.replace('Login')
                })
        }

        render() {
                return (
                        <SafeAreaView style={{flex:1,backgroundColor:'white'}}> 
                                <View style={styles.headerStyle}>
                                        <View style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                                                <Image source={require('../assets/dump.png')} style={{width:50,height:50,marginLeft:20}} />
                                                <Text style={{fontSize:25,fontWeight:'bold',color:'#212121',marginLeft:10}} >Recently Deleted</Text>
                                        </View>
                                        <View style={{margin:10,flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:100}}>
                                                <TouchableOpacity onPress={() => this.onSignOut()}>
                                                        <MaterialIcons name="logout" size={32} color="#212121" />
                                                </TouchableOpacity>
                                        </View>
                                </View>

                                {this.state.recentlyDeleted.length !== 0 ? (
                                        <FlatList
                                        data={this.state.recentlyDeleted}
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
                                                                                        <ListItem.Title style={item.backgroundColor === '#EC5546' || item.backgroundColor === '#3B82F6' || item.backgroundColor === '#5D5CDE' || item.backgroundColor === '#EB5D7B' || item.backgroundColor === '#767C86' ? {color:'white'} : {color:'black'}}>{item.title}</ListItem.Title>
                                                                                        <ListItem.Subtitle style={item.backgroundColor === '#EC5546' || item.backgroundColor === '#3B82F6' || item.backgroundColor === '#5D5CDE' || item.backgroundColor === '#EB5D7B' || item.backgroundColor === '#767C86' ? {color:'white'} : {color:'black'}} right>{item.description}</ListItem.Subtitle>
                                                                                        <ListItem.Subtitle style={item.backgroundColor === '#EC5546' || item.backgroundColor === '#3B82F6' || item.backgroundColor === '#5D5CDE' || item.backgroundColor === '#EB5D7B' || item.backgroundColor === '#767C86' ? {color:'white'} : {color:'black'}} right>{item.dateAndTime}</ListItem.Subtitle>
                                                                                </View>
                                                                        </View>
                                                                </ListItem.Content>
                                                                <TouchableOpacity onPress={() => this.showAlert(item)}>
                                                                        <Entypo name="dots-three-vertical" size={28} color="black" />
                                                                </TouchableOpacity>
                                                        </ListItem>    
                                                )
                                        }}
                                        keyExtractor={(item, index) => index.toString()}
                                />
                                ) : (
                                        <View>
                                                <Text
                                                style={{
                                                        marginTop: 100,
                                                        fontSize: 35,
                                                        fontWeight: '200',
                                                        alignSelf: 'center',
                                                }}>
                                                        No Reminders found
                                                </Text>

                                        <View style={{ marginVertical: 48, alignItems: 'center' }}>
                                                <TouchableOpacity
                                                        style={{
                                                        borderWidth: 2,
                                                        borderColor: theme.blue,
                                                        borderRadius: 4,
                                                        padding: 15,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        }}
                                                        onPress={() => this.props.navigation.navigate('Add')}
                                                >
                                                        <AntDesign name="plus" size={16} color={theme.darkBlue} />
                                                </TouchableOpacity>

                                                        <Text
                                                                style={{
                                                                color: theme.darkBlue,
                                                                fontWeight: '600',
                                                                fontSize: 14,
                                                                marginTop: 8,
                                                                }}
                                                        >
                                                                Add patient
                                                        </Text>
                                                </View>
                                        </View>
                                )}
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
