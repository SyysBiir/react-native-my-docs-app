import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator,NavigationActions } from 'react-navigation';
import Check from './check'
import Login from './login'
import Register from './register'
import Home from './main'
import Docs from './docs'
import PDF from './doc_view'
import UploadDoc from './upload'
import ShareDoc from './share'

const App = StackNavigator({
  checkPage: {screen: Check},
  loginPage: {screen: Login},
  registerPage: {screen: Register},
  homePage: {screen: Home},
  docsPage: {screen: Docs},
  sharePage: {screen: ShareDoc},
  viewPage: {screen: PDF, navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}`,
    })},
  uploadPage: {screen: UploadDoc},
}, 
{
  initialRouteName: 'checkPage',
});

const defaultGetStateForAction = App.router.getStateForAction;

App.router.getStateForAction = (action, state) => {
  return defaultGetStateForAction(action, state);
};

AppRegistry.registerComponent('App', () => App);
