import React from 'react'
import {TextInput,View,StyleSheet} from 'react-native'

const Textinput = (props) => {
    return(
        <View style={styles.inputContainer}>
            <TextInput keyboardAppearance='dark' secureTextEntry={true} style={styles.input} name='password' placeholder='Password' placeholderTextColor='white' />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:5,
        // alignItems:'center'
      },
      input:{
        color:'white',
        backgroundColor:'#333333',
        width:300,
        padding:10,
        borderRadius:6,
      },
})

export default Textinput