import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

class Spinner extends Component {
  render(){
  return (<View style= {styles.spinner}><ActivityIndicator
        animating={true}
        style={{height: 100}}
        size="large"
        color="white"
      /></View>);
  }
}

var styles = StyleSheet.create({
                                  spinner:{
                                   flex: 1,
                                   justifyContent:'center',
                                   position:'absolute', 
                                   top: 0,
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  backgroundColor:'rgba(0, 0, 0, 0.3)'
                                  }
                                   });

export default Spinner;