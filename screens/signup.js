import React, { Component } from 'react'
import { View,Text,StyleSheet, StatusBar,Platform,TextInput,TouchableOpacity,ActivityIndicator,TouchableWithoutFeedback,Keyboard,SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebaseConfig from '../config'
import * as firebase from 'firebase'

// if(!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

class Signup extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            name:'',
            password:'',
            confirmpassword:'',
            error:'',
            loading:false,

        }
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    signupUser = (email,password,confirmpassword,name) => {
        this.setState({loading:true})
        this.setState({error:''})
        try{
            if(email == '' || password == '' || confirmpassword == '' || name == ''){
                this.setState({error: 'Fields Cannot be empty 😕'})
                this.setState({loading:false})
                return
            }else{
                if(this.validateEmail(email)){
                    if(password != confirmpassword){
                        this.setState({error: 'Passwords do not match 😕'})
                        this.setState({loading:false})
                        return
                    }
                }else{
                    this.setState({error: 'Not a valid email 😕'})
                    this.setState({loading:false})
                    return
                }
            }
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res => {
                firebase
                .database()
                .ref('/users/'+res.user.uid)
                .set({
                    email:email,
                    name:name,
                    created_at: Date.now()
                })
                this.setState({loading:false})
            })
            .catch(error => {
                this.setState({error: error.toString()})
                console.log(error)
                this.setState({loading:false})
            })
        }catch(error){
            console.log(error.toString())
            this.setState({loading:false})
        }
    }


    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAwareScrollView style={{flex:1,backgroundColor:'black'}} >
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Create an account 🙍🏻‍♂️</Text>
                        <Text style={styles.subheading}>just a few details to {`\n`} get started</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <View style={{alignItems:'center'}}>
                            <View style={styles.inputContainer}>
                                <TextInput autoCapitalize='none' keyboardAppearance='dark' keyboardType='default' style={styles.input} onChangeText={(name) => this.setState({name})} name='fullname' placeholder='Full Name' placeholderTextColor='white' />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput autoCapitalize='none' keyboardAppearance='dark'  keyboardType='email-address' style={styles.input} onChangeText={(email) => this.setState({email})} name='email' placeholder='Email' placeholderTextColor='white' />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput autoCapitalize='none' keyboardAppearance='dark' secureTextEntry={true} style={styles.input} onChangeText={(password) => this.setState({password})} name='password' placeholder='Password' placeholderTextColor='white' />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput autoCapitalize='none' keyboardAppearance='dark' secureTextEntry={true} style={styles.input} onChangeText={(confirmpassword) => this.setState({confirmpassword})} name='confirmpassword' placeholder='Confirm Password' placeholderTextColor='white' />
                            </View>
                            <View style={styles.inputContainer}>
                                <TouchableOpacity onPress={() => this.signupUser(this.state.email,this.state.password,this.state.confirmpassword,this.state.name)} style={styles.loginButton}>
                                    {
                                        this.state.loading ? <ActivityIndicator size='small' /> : <Text style={styles.loginButtonText} >CREATE ACCOUNT</Text>
                                    }
                                </TouchableOpacity>
                                <Text onPress={()=> this.props.navigation.navigate('login')} style={{color:'white',marginVertical:15,textAlign:'center'}}>Already have an account ! Login</Text>
                            </View>

                            {
                                this.state.error ? <View style={styles.inputContainer}>
                                    <View style={{backgroundColor:'#ED254E',width:300,borderRadius:6}}>
                                        <Text style={{color:'white',textAlign:'center',padding:15,borderRadius:6,fontWeight:'500'}}>{this.state.error}</Text>
                                    </View>
                                </View> : null
                            }
                            

                        </View>
                        

                    </View>


                    
                </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        
    },
    headingContainer:{
        // backgroundColor:'pink',
        height: Platform.OS == 'android' ? 200 : 250,
        justifyContent:'center'
    },
    heading:{
        textAlign:'center',
        fontSize:32,
        color:'white',
        fontWeight:'800'
    },
    subheading:{
        color:'white',
        marginTop:20,
        fontSize:18,
        textAlign:'center',
        fontWeight:'600',
        
    },
    bodyContainer:{
        // backgroundColor:'red',
        flex:1
    },
    inputContainer:{
        marginVertical:5,
        // alignItems:'center'
        // backgroundColor:'red'
    },
    input:{
        color:'white',
        backgroundColor:'#333333',
        width:300,
        padding:10,
        borderRadius:6,
    },
    loginButtonText:{
        // padding:15,
        // width:300,
        borderRadius:8,
        color:'white',
        // borderColor:'#333333',
        // borderWidth:2,
        textAlign:'center',
        flex:1,
        alignItems:'flex-start',
        fontWeight:'500',
        // position:'absolute'
      },
    loginButton:{
        padding:15,
        width:300,
        borderRadius:8,
        color:'white',
        borderColor:'#333333',
        borderWidth:2,
        textAlign:'center',
    }
})

export default Signup