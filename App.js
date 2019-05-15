import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './screens/Home'
import Service from './screens/Service'
import Settings from './screens/Settings'
import reducer from './reducers'
import middleware from './middleware'
import { SafeAreaView } from 'react-native'
import { Constants } from 'expo'

const addMarginTop = (ToWrap) => {
  return class UpperCaseComponent extends React.Component {
    render() {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
          <ToWrap {...this.props} />
        </SafeAreaView>
      )
    }
  }
}

const HomeStack = createStackNavigator(
  {
    Home: Home,
    Service: Service
  })

const Tabs = createBottomTabNavigator({
  Home: HomeStack,
  Settings: addMarginTop(Settings)
})


export default class App extends React.Component {
  render() {
    const TabsContainer = createAppContainer(Tabs)
    return (
      <Provider store={createStore(reducer, middleware)}>
        <TabsContainer />
      </Provider>
    )
  }
}
