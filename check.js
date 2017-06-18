import React, { Component } from 'react'
import { 
  StyleSheet,
  AsyncStorage,
  View
} from 'react-native'
import Spinner from './components/spinner';
import ajax from './components/ajax';

class Check extends Component {
  static navigationOptions = {
      header: null,
  };
 constructor(){
    super();
  }

  loginCheck(){  
      const { navigate } = this.props.navigation;
      AsyncStorage.getItem("login").then((login) => {
        AsyncStorage.getItem("pass").then((pass) => {
          ajax('POST','event=login'+
              '&login='+login+
              '&pass='+pass)
              .then((data) => {
              if(data.status === 'success')
              {
              navigate('homePage');
              } else {
              navigate('loginPage');
              }
              })
              .catch((error) => {
              navigate('loginPage');
              });   
        }).done();
      }).done(); 
    }
  
  render() {
    return (
      <View style={styles.container}>
        <Spinner/>
        {this.loginCheck()}
      </View>
    );
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F89406',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});

export default Check;