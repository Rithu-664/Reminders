import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Ionicons,MaterialIcons, AntDesign, Entypo, FontAwesome5, Feather, MaterialCommunityIcons, FontAwesome,Fontisto} from '@expo/vector-icons'
import { Input, ListItem, Avatar } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'firebase'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import theme from '../Props/theme';
import ColorPicker from 'react-native-wheel-color-picker'

export default class Add extends Component {
        backgroundColors = ["#EC5546","#F1A43C","#F8D74B","#68CE6A",'#89C2F8']
        backgroundColors2 = ["#3B82F6","#5D5CDE","#EB5D7B","#C883EE","#767C86"]

        state = {
                title:'',
                description:'',
                titleError:'',
                descriptionError:'',
                dateAndTime:'',
                dateTimeError:'',
                timeNotificationShouldBeSent:'',
                modalVisible:false,
                reminderAdded: false,
                backgroundColor:'#f0f0f0',
                isModalVisible: false,
                iconModalVisible: false,
                icon:'clock',
                iconType:'feather'
        }
        
        renderColors() {
                return this.backgroundColors.map(color => {
                        return(
                                <TouchableOpacity key={color} style={{backgroundColor:color,width:30,height:30,borderRadius:4}} onPress={() => this.setState({backgroundColor:color})} />
                        )
                })
        }

        renderColors2() {
                return this.backgroundColors2.map(color => {
                        return(
                                <TouchableOpacity key={color} style={{backgroundColor:color,width:30,height:30,borderRadius:4}} onPress={() => this.setState({backgroundColor:color})} />
                        )
                })
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
                                timeNotificationShouldBeSent:this.state.timeNotificationShouldBeSent === '' ? '5 minutes' : this.state.timeNotificationShouldBeSent + ' minutes',
                                userEmail: firebase.auth().currentUser.email,
                                backgroundColor:this.state.backgroundColor,
                                icon:this.state.icon,
                                iconType:this.state.iconType
                        })
                        .then( async () => {
                                this.props.navigation.goBack()        
                        })
                        this.setState({reminderAdded:false})
                }   
        }

        

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
                                <Modal visible={this.state.iconModalVisible}  onRequestClose={() => this.setState({iconModalVisible: false})} animationType="fade">
                                        <ScrollView contentContainerStyle={{justifyContent:'space-around',height:'80%',backgroundColor:'powderblue',flex:1}}>
                                        <TouchableOpacity style={{position:'absolute', top: 32, left: 25}} onPress={() => this.setState({iconModalVisible:false})}>
                                        <Ionicons name="ios-arrow-back-outline" size={45} color="black" />
                                </TouchableOpacity>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',margin:20,marginTop:40}}>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'bars',iconType:'antdesign'})}} >
                                                                <AntDesign name="bars" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'bookmark',iconType:'entypo'})}} >
                                                                <Entypo name="bookmark" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'cake',iconType:'entypo'})}} >
                                                                <Entypo name="cake" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'ios-gift',iconType:'ionicon'})}} >
                                                                <Ionicons name="ios-gift" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'dumbbell',iconType:'material-community'})}} >
                                                                <MaterialCommunityIcons name="dumbbell" size={35} color="white" />
                                                        </TouchableOpacity>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',margin:20}}>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'ios-home',iconType:'ionicon'})}} >
                                                                <Ionicons name="ios-home" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'ios-tv-sharp',iconType:'ionicon'})}} >
                                                                <Ionicons name="ios-tv-sharp" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'ios-musical-notes-sharp',iconType:'ionicon'})}} >
                                                                <Ionicons name="ios-musical-notes-sharp" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'game-controller',iconType:'ionicon'})}} >
                                                                <Ionicons name="game-controller" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'silverware-fork-knife',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'bars',iconType:'material-community'})}} >
                                                                <MaterialCommunityIcons name="silverware-fork-knife" size={35} color="white" />
                                                        </TouchableOpacity>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',margin:20}}>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'ios-paw-sharp',iconType:'ionicon'})}} >
                                                                <Ionicons name="ios-paw-sharp" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'graduation-cap',iconType:'font-awesome'})}} >
                                                                <FontAwesome name="graduation-cap" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'credit-card',iconType:'font-awesome'})}} >
                                                                <FontAwesome name="credit-card" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'stethoscope',iconType:'font-awesome-5'})}} >
                                                                <FontAwesome5 name="stethoscope" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'leaf',iconType:'material-community'})}} >
                                                                <MaterialCommunityIcons name="leaf" size={35} color="white" />
                                                        </TouchableOpacity>
                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-around',margin:20}}>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'running',iconType:'font-awesome-5'})}} >
                                                                <FontAwesome5 name="running" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'coins',iconType:'font-awesome-5'})}} >
                                                                <FontAwesome5 name="coins" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'backpack',iconType:'material'})}} >
                                                                <MaterialIcons name="backpack" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'pencil-ruler',iconType:'material-community'})}} >
                                                                <MaterialCommunityIcons name="pencil-ruler" size={35} color="white" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{backgroundColor:'#7B7B7B',width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'white'}} onPress={() => {this.setState({icon:'pills',iconType:'fontisto'})}} >
                                                                <Fontisto name="pills" size={35} color="white" />
                                                        </TouchableOpacity>
                                                </View>
                                        </ScrollView>
                                </Modal>

                                <TouchableOpacity style={{position:'absolute', top: 32, left: 25}} onPress={() => this.props.navigation.goBack()}>
                                        <Ionicons name="ios-arrow-back-outline" size={45} color="black" />
                                </TouchableOpacity>
                                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                                <StatusBar hidden />
                                <DateTimePicker
                                        isVisible={this.state.modalVisible}
                                        mode="datetime"
                                        onConfirm={onConfirm}
                                        onCancel={onCancel}
                                        display="spinner"
                                        isDarkModeEnabled
                                />
                                <View style={{backgroundColor:'white',marginTop:50,marginHorizontal:50}}>
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
                                        <Text style={styles.header}>background Color (will be displayed on the home screen) </Text>
                                        <View style={{alignSelf:'stretch'}}>
                                                <View style={{}}>
                                                        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:10}}>
                                                                {this.renderColors()}
                                                        </View>
                                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                                {this.renderColors2()}
                                                        </View>
                                                </View>
                                        </View>

                                        <Text style={[styles.header,{marginTop:15,marginBottom:10}]}>reminder icon (will be displayed on the home screen)</Text>  
                                        <TouchableOpacity onPress={() =>this.setState({iconModalVisible:true})} style={{marginBottom:10}}>
                                                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                                        <View>
                                                        <FontAwesome5
                                                                name="hand-point-up"
                                                                size={28}
                                                                color="#696969"
                                                        />
                                                        </View>

                                                        <Text style={styles.chooseDate}>choose</Text>
                                                </View>
                                                </TouchableOpacity>                             
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
                                         <View style={{flexDirection:'row',margin:10,justifyContent:'space-around'}}>
                                                <Text style={{fontSize:13,fontWeight:'200',textTransform:'uppercase',color:'#8e93a1',marginRight:10}}>This is how your reminder will look </Text>
                                                <FontAwesome5
                                                                name="hand-point-down"
                                                                size={28}
                                                                style={{marginLeft:10}}
                                                                color="#696969"
                                                />
                                        </View>

                                        <ListItem>
                                <ListItem.Content
                                        style={{
                                        backgroundColor: this.state.backgroundColor,
                                        padding: 20,
                                        borderRadius: 20,
                                        }}
                                >
                                        <View style={{ flexDirection: 'row' }}>
                                                <View>
                                                        <Avatar
                                                                rounded
                                                                icon={{ name: this.state.icon, type: this.state.iconType, color:'white' }}
                                                                activeOpacity={0.7}
                                                                source={{
                                                                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                                                                }}
                                                        />
                                                </View>
                                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                                        <ListItem.Title>{this.state.title}</ListItem.Title>
                                                        <ListItem.Subtitle right>{this.state.description}</ListItem.Subtitle>
                                                        <ListItem.Subtitle right>{this.state.dateAndTime}</ListItem.Subtitle>
                                                </View>
                                        </View>
                                </ListItem.Content>
                      </ListItem>
                                </View>

                               
                                {this.state.reminderAdded ? <ActivityIndicator size="large" color="red" /> : <TouchableOpacity style={{alignItems:'center', flexDirection:'row',alignSelf:'center',marginTop:20}} onPress={() => this.addReminder()}>
                                        <Feather name="clock" size={28} color="black"  style={{marginHorizontal:10}}/>
                                        <Text style={[styles.header,{fontWeight:'600',fontSize:25,textTransform:'capitalize',color:'black'}]}>add reminder</Text>
                                </TouchableOpacity>}
                                </ScrollView>
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
