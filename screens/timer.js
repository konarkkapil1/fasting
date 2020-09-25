import React from 'react'
import { Text,View,Button,StyleSheet,StatusBar,Platform } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'

const updateStartTime = () => {
    try{
        alert('time started')
    }catch(error){
        console.log(error)
    }
}

class Timer extends React.Component{
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Welcome</Text>
                </View>
                <Button onPress={() => updateStartTime()} title='start Fast' />
                <Button title='logout' onPress={() => firebase.auth().signOut()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    headerContainer:{
        height:Platform.OS == 'android' ? 100 : 150,
        // backgroundColor:'pink',
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        color:'#FFF',
        fontSize:28,
        fontWeight:'700',
    }
})


export default Timer