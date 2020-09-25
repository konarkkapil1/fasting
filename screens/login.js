import React, {Component} from 'react'
import { Text,View,Image,TouchableOpacity,StyleSheet,TextInput,Platform,StatusBar,ActivityIndicator,TouchableWithoutFeedback,Keyboard,SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Google from "expo-google-app-auth";
import firebase from 'firebase'
import setCurrentUser from '../redux/user/user.actions'
import { connect } from 'react-redux'
 
class Login extends Component  {

    constructor(props){
      super(props)
      this.state = {
        email:'',
        password:'',
        error:'',
        loading:false
      }
    }
  
    loginUser = (email,password) => {
      this.setState({loading:true})
      this.setState({error:''})
      try{
        if(email == '' || password == ''){
          this.setState({error: 'Fields cannot be empty 😕'})
          this.setState({loading:false})
          return
        }else{
          firebase.auth().signInWithEmailAndPassword(email,password)
          .then(res => {
            this.props.setCurrentUser(res)
            this.setState({loading:false})
          })
          .catch(error => {
            this.setState({error: error.toString()})
            this.setState({loading:false})
          })
        }
      }catch(error){
        this.setState({error: error.toString()})
      }
    }
  
    isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }
  
    onSignIn = (googleUser) => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(result => {
            console.log("user signed in")
            if(result.additionalUserInfo.isNewUser){
              firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                created_at: Date.now()
              })
            }else{
              firebase
              .database()
              .ref('/users/' + result.user.uid).update({
                last_logged_in: Date.now()
              })
            }
          })
          
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this));
    }
  
    signInWithGoogleAsync = async() => {
      try {
        const result = await Google.logInAsync({
          androidClientId: '863689321401-lo5js4d4jg8gh3o41a8c6ghhds557ian.apps.googleusercontent.com',
          behavior:'web',
          iosClientId: '863689321401-ggicms2l5hme49o2u49eecqhbsfvo0ss.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          this.onSignIn(result)
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }
  
    render(){
      return(
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        <KeyboardAwareScrollView style={{flex:1,backgroundColor:'black'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
          
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Start Your Fitness Journey 💪🏻</Text>
              <Text style={styles.subheading}>Login to track your fasts and save them {`\n`} to Cloud</Text>
            </View>
    
    
            <View style={styles.bodyContainer}>
    
              <View style={{alignItems:'center'}}>
                <TouchableOpacity>
                  <View style={styles.loginButtonGoogle} onStartShouldSetResponder={() => this.signInWithGoogleAsync()} >
                    <Image source={require('../assets/google.png')} style={{height:20,width:20}} />
                    <Text style={{color:'white',fontSize:16,textAlign:'center',flex:2,fontWeight:'600'}}>Login with Google</Text>
                  </View>
                </TouchableOpacity>
    
                <Text style={{color:'white',marginVertical:20,fontSize:20,fontWeight:'700',width:300,textAlign:'center'}}>OR</Text>
    
              </View>
              
    
              <View style={{alignItems:'center'}}>
    
                <Text style={{color:'white',fontSize:15,fontWeight:'400',marginVertical:10,width:300}}>Login With Email</Text>
    
                <View style={styles.inputContainer}>
                  <TextInput keyboardAppearance='dark' autoCapitalize='none' onChangeText={(email) => this.setState({email})}  keyboardType='email-address' style={styles.input} name='email' placeholder='Email' placeholderTextColor='white' />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput keyboardAppearance='dark' onChangeText={(password) => this.setState({password})} secureTextEntry={true} style={styles.input} name='password' placeholder='Password' placeholderTextColor='white' />
                </View>
                <View style={styles.inputContainer}>
                  <TouchableOpacity style={styles.loginButton} onPress={() => this.loginUser(this.state.email,this.state.password)}>
                    {
                      this.state.loading ? <ActivityIndicator size='small' /> : <Text  style={styles.loginButtonText}>LOGIN</Text>
                    }
                  </TouchableOpacity>

                  <Text onPress={()=> this.props.navigation.navigate('signup')} style={{color:'white',marginVertical:15,textAlign:'center'}}>Don't have an account ? Sign Up</Text>
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
          
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        </SafeAreaView>
      )
    }
  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor:'black',
      flex:1,
      // paddingHorizontal:20
    },
    headingContainer:{
      // backgroundColor:'red',
      height:Platform.OS == 'android' ? 200 : 250,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:38
    },
    heading:{
      color:'white',
      fontSize:32,
      fontWeight:'800',
      textAlign:'center'
    },
    subheading:{
      color:'white',
      marginTop:25,
      fontSize:18,
      textAlign:'center',
      fontWeight:'600'
    },
    bodyContainer:{
      flex:1,
      // backgroundColor:'pink',
      // alignItems:'center'
    },
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
    loginButtonGoogle:{
      backgroundColor:'#4c8bf5',
      padding:15,
      width:300,
      borderRadius:8,
      flexDirection:'row'
    },
    loginButton:{
      padding:15,
      width:300,
      borderRadius:8,
      color:'white',
      borderColor:'#333333',
      borderWidth:2,
      textAlign:'center',
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
})

const mapDispatchToProps = (dispatch) => {
  return{
    setCurrentUser: user => dispatch({
      type:'ADD_LOGIN_USER',
      payload: user
    })
  }
}

export default connect(null,mapDispatchToProps)(Login)