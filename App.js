import React from 'react'
import { createSwitchNavigator,createAppContainer } from 'react-navigation'
import Auth from './screens/auth'
import Home from './screens/home'
import Loading from './screens/loading'
import { firebaseConfig } from './config'
import firebase from 'firebase'
import store from './redux/store'
import {Provider} from 'react-redux'
firebase.initializeApp(firebaseConfig)

const switchNavigator = createSwitchNavigator({
  loading: Loading,
  login: Auth,
  home: Home
})

const Appcontainer = createAppContainer(switchNavigator)


class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <Appcontainer /> 
      </Provider>
    )
  }
  
}

export default App