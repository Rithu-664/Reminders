import React from 'react'
import { View, TouchableOpacity, Button, StyleSheet, Image, Text } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({selected}) => {
        let backgroundColor; 

        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'

        return (
                <View style={{width: 5, height: 5, marginHorizontal: 3, backgroundColor}}/>
        )
}

const Skip = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Skip</Text>
                </TouchableOpacity> 
        )
}

const Next = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Next</Text>
                </TouchableOpacity> 
        )
}

const Done = ({...props}) => {
        return(
                <TouchableOpacity  style={{marginHorizontal:10}} {...props}>
                        <Text style={{fontSize:16}}>Done</Text>
                </TouchableOpacity> 
        )
}

const OnboardingScreen = ({navigation}) => {
        return(
                <Onboarding
                        SkipButtonComponent={Skip}
                        NextButtonComponent={Next}
                        DoneButtonComponent={Done}
                        DotComponent={Dots}
                        transitionAnimationDuration={600}                  
                        onSkip={() => navigation.replace('Login')}
                        onDone={() => navigation.replace('Login')}
                        pages={[
                                {
                                        backgroundColor: '#A6E4D0',
                                        image: <Image source={require('../assets/onboarding-img1.png')} />,
                                        title: 'Create reminders at a specific time',
                                        subtitle: 'Add reminders with a custom time',
                                },
                                {
                                        backgroundColor: '#FDEB93',
                                        image: <Image source={require('../assets/onboarding-img2.png')} />,
                                        title: 'Add images to your reminders',
                                        subtitle: 'Add images to make your reminder look more aesthetic',
                                },
                                {
                                        backgroundColor: '#E9BCBE',
                                        image: <Image source={require('../assets/onboarding-img3.png')} />,
                                        title: 'Get Notifications',
                                        subtitle: 'You will get a notification for each reminder before 5 minutes (default)',
                                },
                        ]}
                />
        )
}

export default OnboardingScreen

const styles = StyleSheet.create({
        container: {
                flex:1,
                alignItems:'center',
                justifyContent:'center'
        }
})
