import React, {Component} from 'react'
import { View,ActivityIndicator,StyleSheet,Text } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux'

class Loading extends Component{
    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        console.log('user test started')
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                console.log('hello test',this.props)
                if(this.props.user.user == null){
                    firebase.auth().signOut()
                    this.props.navigation.navigate('login')
                }else{
                    this.props.navigation.navigate('home')
                }
                
            }else{
                console.log("user not found")
                this.props.navigation.navigate('login')
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.headingText}>Fasting App</Text>
                </View>
                <ActivityIndicator style={{flex:1}} size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'black'
    },
    body:{
        // backgroundColor:'pink',
        height:100,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headingText:{
        color:'#fff',
        fontSize:30,
        fontWeight:'800'
    }
})

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Loading)