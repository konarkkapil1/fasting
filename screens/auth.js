import React from 'react'
import Signup from './signup'
import Login from './login'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'


const Stack = createStackNavigator()

const MyStack = () => {
  return(
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name='signup' component={Signup} />
    </Stack.Navigator>
  )
}


const Auth = () => {
  return(
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

export default Auth