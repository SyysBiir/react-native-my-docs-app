import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableHighlight, AsyncStorage } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
const {width, height} = Dimensions.get('window');

class Home extends Component {
  static navigationOptions = {
      header: null,
  };
  _exit = () => {
    const { navigate } = this.props.navigation;
    AsyncStorage.setItem('login', '0');
    AsyncStorage.setItem('password', '0');
    AsyncStorage.setItem('id', '0');
    navigate('loginPage'); 
  }
  render(){
    const { navigate } = this.props.navigation;
    return (<View style= {styles.container}>
              <Text style={styles.head}>Главная</Text>
              <View>
                <Button title='Загрузить документ' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress = { () => navigate('uploadPage')}/>
                <Button title='Отправить документ' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress = { () => navigate('sharePage')} />
                <Button title='Мои документы' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress = { () => navigate('docsPage')}/>
                <Button title='Выход' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress = { () => {this._exit()}}/>
              </View>
            </View>);
  }
}

var styles = StyleSheet.create({
                                  container:{
                                    flex: 1,
                                    flexDirection:'column',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:'white'
                                  },
                                  head:{
                                    fontSize: 25,
                                    marginBottom: 40,
                                  },
                                  btnStyle:{
                                    width:width - 50,
                                    marginTop: 40
                                  },
                                  hrefStyle:{
                                    marginTop: 40,
                                    color: '#03b1f7',
                                    textAlign: 'center'
                                  }
                              });

export default Home;