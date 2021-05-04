import React, { Component } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Ionicons,MaterialIcons, FontAwesome5, Feather} from '@expo/vector-icons'
import { Input,Avatar } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import theme from '../Props/theme';

export default class Add extends Component {
        state = {
                title:'',
                description:'',
                titleError:'',
                descriptionError:'',
                dateAndTime:'',
                dateTimeError:'',
                timeNotificationShouldBeSent:'',
                imageURL:'#',
                modalVisible:false,
                reminderAdded: false
        }

        addReminder = async () => {
                if(this.state.title === ''){
                        this.setState({titleError:'Please enter a title. Required'})
                }else if(this.state.description === '') {
                        this.setState({descriptionError:'Please enter a desciprtion. Required'})
                }else if(this.state.dateAndTime === '') {
                        this.setState({dateTimeError: 'Please choose a date & time for this reminder. Required'})
                }else {
                        this.setState({reminderAdded:true})
                        firebase
                        .firestore()
                        .collection('Reminders')
                        .doc(this.state.title)
                        .set({
                                title: this.state.title,
                                description:this.state.description,
                                dateAndTime:this.state.dateAndTime,
                                timeNotificationShouldBeSent:this.state.timeNotificationShouldBeSent === '' ? '5 minutes' : this.state.timeNotificationShouldBeSent + ' minutes'
                        })
                        .then( async () => {
                                if(this.state.imageURL === '#'){
                                        this.props.navigation.goBack()
                                }else {
                                        var response = await fetch(this.state.imageURL);
                                        var blob = await response.blob();
                                        var ref = firebase
                                        .storage()
                                        .ref()
                                        .child('reminder_images/' + this.state.title);
                                                return ref.put(blob).then((response) => {
                                                        this.props.navigation.goBack()
                                        }).catch(error => {
                                                alert(error.message)
                                        })
                                }
                        })
                        this.setState({reminderAdded:false})
                }   
        }

        uploadImage = async (uri, task) => {
                var response = await fetch(uri);
                var blob = await response.blob();
                var ref = firebase
                  .storage()
                  .ref()
                  .child('reminder_images/' + task);
                return ref.put(blob).then((response) => {
                  this.fetchImage(task);
                }).catch(error => {
                  alert(error.message)
                })
              };
        
              fetchImage = async (userId) => {
                var storageRef = firebase
                  .storage()
                  .ref()
                  .child('reminder_images/' + userId); 
                  // Get the download URL
                await storageRef
                  .getDownloadURL()
                  .then((url) => {
                    this.setState({imageURL: url})
                  })
                  .catch((error) => {
                    this.setState({imageURL:'#'})
                  });
              };
            
            
                selectPicture = async () => {
                const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                  mediaType: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                });
                if (!cancelled) {
                  if(this.state.title === ''){
                          Alert.alert('Please enter a title to choose a profile picture')
                  }else{
                        this.setState({imageURL: uri})
                        this.uploadImage(uri, this.state.title);
                  }
                }
              };

                componentDidUpdate(){
                        if(this.state.title !== '' && this.state.titleError !== ''){
                                this.setState({titleError:''})
                        }else if(this.state.description !== '' && this.state.descriptionError !== ''){
                                this.setState({descriptionError:''})
                        }else if(this.state.dateAndTime !== '' && this.state.dateTimeError !== ''){
                                this.setState({dateTimeError:''})
                        }
                }

        render() {
                const onConfirm = (dateAndTime) => {
                        this.setState({ dateAndTime: FormatDate(dateAndTime) });
                        hideModal();
                        console.log(FormatDate(dateAndTime))
                };

                const FormatDate = (data) => {
                        let date = data.getDate()
                        if(date < 10){
                                date = '0' + date
                        }
                        let month = data.getMonth() + 1
                        if(month < 10){
                                month = '0' + month
                        }
                        let year = data.getFullYear() 
                        let hour = data.getHours()
                        if(hour < 10){
                                hour = '0' + hour
                        }
                        let minutes = data.getMinutes()
                        if(minutes < 10){
                                minutes = '0' + minutes
                        }
                        let dateTimeString = 
                        date +
                        '-' +
                        month +
                        '-' +
                        year +
                        ' ' +
                        hour +
                        ':' +
                        minutes;
                        return dateTimeString
                }


                
                  
                const onCancel = () => {
                        hideModal();
                };
                  
                const showModal = () => {
                        this.setState({ modalVisible: true });
                };
                  
                const hideModal = () => {
                        this.setState({ modalVisible: !this.state.modalVisible });
                };

                return (
                        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
                                <StatusBar hidden />
                                <DateTimePicker
                                        isVisible={this.state.modalVisible}
                                        mode="datetime"
                                        onConfirm={onConfirm}
                                        onCancel={onCancel}
                                        display="spinner"
                                        isDarkModeEnabled
                                />
                                <TouchableOpacity style={{position:'absolute', top: 32, left: 25}} onPress={() => this.props.navigation.goBack()}>
                                        <Ionicons name="ios-arrow-back-outline" size={45} color="black" />
                                </TouchableOpacity>
                                <View style={{backgroundColor:'white',marginTop:50,marginHorizontal:50}}>
                                        <Avatar
                                                rounded
                                                source={{ uri: this.state.imageURL }}
                                                size={100}
                                                onPress={() => this.selectPicture()}
                                                icon={this.state.imageURL === '#' ? {name:'clock',type:'feather'} : null}
                                                showEditButton
                                                containerStyle={{alignSelf:'center',margin:10}}
                                        />
                                        <Text style={styles.header}>title</Text>
                                        <Input
                                                value={this.state.title}
                                                onChangeText={(title) => this.setState({title:title})}
                                        />
                                        {this.state.titleError === '' ? (
                                                <Text></Text>
                                        ) : (
                                                <View
                                                        style={{
                                                                padding: 5,
                                                                backgroundColor: '#FF9D9D',
                                                                margin: 5,
                                                                borderRadius: 10,
                                                                marginVertical: 10,
                                                        }}
                                                >
                                                        <View style={{ flexDirection: 'row' }}>
                                                                <MaterialIcons name="error" color="white" size={20} />
                                                                <Text
                                                                        style={{
                                                                                fontSize: 20,
                                                                                fontWeight: '300',
                                                                                color: 'white',
                                                                                marginLeft: 5,
                                                                                width: '85%',
                                                                        }}
                                                                >
                                                                        {this.state.titleError}
                                                                </Text>
                                                        </View>
                                                </View>
                                        )}
                                        <Text style={styles.header}>description</Text>
                                        <Input
                                                value={this.state.description}
                                                onChangeText={(description) => this.setState({description:description})}
                                        />
                                        {this.state.descriptionError === '' ? (
                                                <Text></Text>
                                        ) : (
                                                <View
                                                        style={{
                                                                padding: 5,
                                                                backgroundColor: '#FF9D9D',
                                                                margin: 5,
                                                                borderRadius: 10,
                                                                marginVertical: 10,
                                                                
                                                        }}
                                                >
                                                        <View style={{ flexDirection: 'row' }}>
                                                                <MaterialIcons name="error" color="white" size={20} />
                                                                <Text
                                                                        style={{
                                                                                fontSize: 20,
                                                                                fontWeight: '300',
                                                                                color: 'white',
                                                                                marginLeft: 5,
                                                                                width: '85%',
                                                                        }}
                                                                >
                                                                        {this.state.descriptionError}
                                                                </Text>
                                                        </View>
                                                </View>
                                        )}
                                        <Text style={styles.header}>Date and time</Text>
                                        {this.state.dateAndTime === '' ? (
                                                <TouchableOpacity onPress={() => showModal()}>
                                                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                        <View style={{ marginTop: 10 }}>
                                                        <FontAwesome5
                                                        name="hand-point-up"
                                                        size={28}
                                                        color="#696969"
                                                        />
                                                        </View>

                                                        <Text style={styles.chooseDate}>choose</Text>
                                                </View>
                                                </TouchableOpacity>
                                        ) : (
                                                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '200' }}>
                                                {this.state.dateAndTime}
                                                </Text>
                                        )}

                                        {this.state.dateTimeError === '' ? (
                                                <Text></Text>
                                        ) : (
                                                <View
                                                        style={{
                                                                padding: 5,
                                                                backgroundColor: '#FF9D9D',
                                                                margin: 5,
                                                                borderRadius: 10,
                                                                marginVertical: 10,
                                                        }}
                                                >
                                                        <View style={{ flexDirection: 'row' }}>
                                                                <MaterialIcons name="error" color="white" size={20} />
                                                                <Text
                                                                        style={{
                                                                                fontSize: 20,
                                                                                fontWeight: '300',
                                                                                color: 'white',
                                                                                marginLeft: 5,
                                                                                width: '85%',
                                                                        }}
                                                                >
                                                                        {this.state.dateTimeError}
                                                                </Text>
                                                        </View>
                                                </View>
                                        )}
                                        <Text style={[styles.header,{marginTop:20}]}>how many minutes before the actual time do you want the alarm to go off?</Text>
                                        <BouncyCheckbox
                                                size={25}
                                                fillColor={theme.pink}
                                                unfillColor="#FFFFFF"
                                                text="5 minutes"
                                                iconStyle={{ borderColor: theme.pink }}
                                                style={{margin:15}}
                                                onPress={(isChecked) => {isChecked ? this.setState({timeNotificationShouldBeSent:'5'}) : this.setState({timeNotificationShouldBeSent:''}) }}
                                                disabled={this.state.timeNotificationShouldBeSent !== '' && this.state.timeNotificationShouldBeSent !== '5' ? true : false}
                                        />
                                        <BouncyCheckbox
                                                size={25}
                                                fillColor={theme.pink}
                                                unfillColor="#FFFFFF"
                                                style={{margin:15}}
                                                text="10 minutes"
                                                iconStyle={{ borderColor: theme.pink }}
                                                onPress={(isChecked) => {isChecked ? this.setState({timeNotificationShouldBeSent:'10'}) : this.setState({timeNotificationShouldBeSent:''}) }}
                                                disabled={this.state.timeNotificationShouldBeSent !== '' && this.state.timeNotificationShouldBeSent !== '10' ? true : false}
                                        />
                                        <BouncyCheckbox
                                                size={25}
                                                fillColor={theme.pink}
                                                style={{margin:15}}
                                                unfillColor="#FFFFFF"
                                                text="15 minutes"
                                                iconStyle={{ borderColor: theme.pink }}
                                                onPress={(isChecked) => {isChecked ? this.setState({timeNotificationShouldBeSent:'15'}) : this.setState({timeNotificationShouldBeSent:''}) }}
                                                disabled={this.state.timeNotificationShouldBeSent !== '' && this.state.timeNotificationShouldBeSent !== '15' ? true : false}
                                        />
                                        <BouncyCheckbox
                                                size={25}
                                                fillColor={theme.pink}
                                                style={{margin:15}}
                                                unfillColor="#FFFFFF"
                                                text="20 minutes"
                                                iconStyle={{ borderColor: theme.pink }}
                                                onPress={(isChecked) => {isChecked ? this.setState({timeNotificationShouldBeSent:'20'}) : this.setState({timeNotificationShouldBeSent:''}) }}
                                                disabled={this.state.timeNotificationShouldBeSent !== '' && this.state.timeNotificationShouldBeSent !== '20' ? true : false}
                                        />
                                </View>
                                {this.state.reminderAdded ? <ActivityIndicator size="large" color="red" /> : <TouchableOpacity style={{alignItems:'center', flexDirection:'row',alignSelf:'center',marginTop:20}} onPress={() => this.addReminder()}>
                                        <Feather name="clock" size={28} color="black"  style={{marginHorizontal:10}}/>
                                        <Text style={[styles.header,{fontWeight:'600',fontSize:25,textTransform:'capitalize',color:'black'}]}>add reminder</Text>
                                </TouchableOpacity>}
                        </SafeAreaView>
                )
        }
}

const styles = StyleSheet.create({
        header: {
          fontSize: 13,
          fontWeight: '200',
          color: '#8e93a1',
          textTransform: 'uppercase',
        },
        chooseDate: {
          fontSize: 13,
          fontWeight: '600',
          color: '#696969',
          textTransform: 'uppercase',
          marginLeft: 5,
          marginTop: 10,
        },
});
