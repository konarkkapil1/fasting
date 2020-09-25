import React from 'react'
import { Text,View,Button,StyleSheet,StatusBar } from 'react-native'
import firebase from 'firebase'

const History = () => {
    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
            
            <Button title='logout' onPress={() => firebase.auth().signOut()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    }
})

export default History