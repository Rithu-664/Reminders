import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import db from '../Config/Firebase';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications'

export default class Login extends React.Component {
  state = {
    email: 'rithu@gmail.com',
    password: 'password',
    showPassword: '',
    userLoggedIn: false,
    modalEmail: '',
    modalPassword: '',
    username: '',
    phoneNumber: '',
    age: '',
    isModalVisible: false,
    confirmPassword:''
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isModalVisible}
        transparent={false}
        animationType="fade">
        <Text style={styles.signUpText}>Sign up to get started</Text>

        <ScrollView style={{ marginTop: 20}}>
          <TextInput
            style={styles.formTextInput}
            placeholder={'Userame'}
            value={this.state.username}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                username: text,
              });
            }}
            placeholderTextColor="darkgray"
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'Email ID'}
            value={this.state.modalEmail}
            onChangeText={(text) => {
              this.setState({
                modalEmail: text,
              });
            }}
            placeholderTextColor="darkgray"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Age"
            maxLength={2}
            value={this.state.age}
            onChangeText={(text) => {
              this.setState({
                age: text,
              });
            }}
            placeholderTextColor="darkgray"
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Phone number"
            maxLength={10}
            value={this.state.phoneNumber}
            onChangeText={(text) => {
              this.setState({
                phoneNumber: text,
              });
            }}
            placeholderTextColor="darkgray"
            keyboardType="numeric"
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'Password'}
            secureTextEntry={true}
            value={this.state.modalPassword}
            onChangeText={(text) => {
              this.setState({
                modalPassword: text,
              });
            }}
            placeholderTextColor="darkgray"
          />

          <TextInput
            style={styles.formTextInput}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(text) => {
              this.setState({
                confirmPassword: text,
              });
            }}
            placeholderTextColor="darkgray"
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              if(this.state.modalEmail === '' ||
              this.state.username === '' ||
              this.state.age === '' ||
              this.state.phoneNumber === '' ||
              this.state.modalPassword === '' ||
              this.state.confirmPassword === ''){
                Alert.alert(
                  "Couldn't sign up",
                  'Please enter all information to sign up'
                )
              }else if(this.state.modalPassword !== this.state.confirmPassword){
                Alert.alert(
                  "Couldn't sign up",
                  'Please make sure the password and confirm password match'
                )
              }else {
                this.onSignUp(
                  this.state.modalEmail,
                  this.state.modalPassword
                );
              }      
            }}>
            <Text> Register </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.setState({ isModalVisible: false })}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  };

  onSignIn = async (email, password) => {
    this.setState({ userLoggedIn: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.props.navigation.replace('Home');
        
      })
      .catch((error) => {
        Alert.alert("Couldn't sign in", error.message);
      });
    this.setState({ userLoggedIn: false });
  };

  onSignUp = async (email, password) => {

    let token = await Notifications.getDevicePushTokenAsync()
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.modalEmail,
        this.state.modalPassword
      )
      .then(() => {
        firebase.firestore().collection('Users').doc(this.state.modalEmail).set({
          username: this.state.username,
          email_id: this.state.modalEmail,
          age: this.state.age,
          phoneNumber: this.state.phoneNumber,
          notificationToken:token
        });
        this.setState({ isModalVisible: false });
        this.props.navigation.replace('Home');
      })
      .catch((error) => {
        Alert.alert("Coudn't create user", error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#dfff' }}>
        {this.showModal()}
        <StatusBar hidden />

        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          <Text style={{ textTransform: 'uppercase', color: '#646464' }}>
            email id
          </Text>
          <TextInput
            style={{
              marginHorizontal: 10,
              paddingTop: 10,
              paddingHorizontal: 10,
              marginBottom: 10,
              borderBottomColor: '#646464',
              borderBottomWidth: 1,
              marginVertical: 5,
              color: '#646464',
              paddingBottom: 4,
            }}
            value={this.state.email}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            onChangeText={(email) => this.setState({ email: email })}
            placeholderTextColor="darkgray"
          />
          <Text style={{ textTransform: 'uppercase', color: '#646464' }}>
            password
          </Text>
          <TextInput
            style={{
              marginHorizontal: 10,
              paddingTop: 10,
              paddingHorizontal: 10,
              marginBottom: 10,
              borderBottomColor: '#646464',
              borderBottomWidth: 1,
              marginVertical: 5,
              color: '#646464',
              paddingBottom: 4,
            }}
            placeholderTextColor="darkgray"
            value={this.state.password}
            keyboardType="visible-password"
            onChangeText={(password) => this.setState({ password: password })}
            secureTextEntry={this.state.showPassword === true ? false : true}
          />
          <CheckBox
            checkedColor="#0F0"
            onPress={() =>
              this.setState({
                showPassword: !this.state.showPassword,
              })
            }
            size={20}
            title="Show password"
            uncheckedColor="#F00"
            checked={this.state.showPassword}
            checkedIcon="check"
            uncheckedIcon="close"
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#FFCBF6',
              marginVertical: 15,
              borderRadius: 30,
            }}
            onPress={() =>
              this.onSignIn(this.state.email, this.state.password)
            }>
            {this.state.userLoggedIn === false ? (
              <Text
                style={{
                  fontSize: 20,
                  color: '#494949',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}>
                Sign in
              </Text>
            ) : (
              <ActivityIndicator size={'large'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 15,
              backgroundColor: '#D1CCFF',
              marginBottom: 15,
              borderRadius: 30,
            }}
            onPress={() => this.setState({ isModalVisible: true })}>
            <Text
              style={{
                fontSize: 20,
                color: '#494949',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#8022d9',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    alignSelf: 'center',
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  signUpText: {
    alignSelf: 'center',
    marginTop: Constants.statusBarHeight,
    fontSize: 30,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
