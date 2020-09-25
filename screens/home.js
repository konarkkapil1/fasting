import React from 'react'
import { Text,View,Button,Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Timer from './timer'
import History from './history'
import firebase from 'firebase'


const Tab = createBottomTabNavigator()
const Tabs = () => {
  return(
    <Tab.Navigator 
      tabBarOptions={{
          activeTintColor:'#F2545B',
          style:{
            backgroundColor:'#141414',
            borderTopColor:'#141414',
            paddingTop:7,
            height:84
          },
          labelStyle:{
            fontSize:13,
            fontWeight:'700'
            // marginTop:10
          }
        }}
    >
      <Tab.Screen name='Timer' component={Timer} options={{
        tabBarIcon: ({size,color}) => <Ionicons name='md-stopwatch' size={size} color={color} />,
        
      }} 
      />
      <Tab.Screen name='History' component={History} options={{
        tabBarIcon: ({size,color}) => <Entypo name='bar-graph' size={size} color={color} />
      }} />
    </Tab.Navigator>
  )
}

const Home = ({navigation}) => {
    return(
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    )
}


export default Home
