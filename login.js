import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableHighlight, Alert, AsyncStorage, Keyboard } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
const {width, height} = Dimensions.get('window');
import ajax from './components/ajax';
import Spinner from './components/spinner';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      pass: '',
      loading: false
    };
  }
  static navigationOptions = {
      header: null,
  };

  addlogin = (value, value2, value3) => {
      AsyncStorage.setItem('login', value);
      AsyncStorage.setItem('pass', value2);
      AsyncStorage.setItem('id', value3);
      Keyboard.dismiss();
  }

  login = () => {
          const { navigate } = this.props.navigation;
          this.setState({
              loading: true
          });
          ajax('POST', 'event=login'+
              '&login='+this.state.login+
              '&pass='+this.state.pass).then((data)=>{
              this.setState({
                loading: false
              });
              if(data.status === 'success')
              {
              navigate('homePage');
              this.addlogin(this.state.login, this.state.pass, data.id);
              } else {
              Alert.alert(
                          'Ошибка',
                          'Неправильный пароль или логин',
                          [
                           {text: 'OK'},
                           ]
                          );
              }
            }).catch((error) => {
              Alert.alert(
                           'Ошибка',
                           'Не удалось соединиться с сервером. Текст ошибки:'+error,
                           [
                            {text: 'OK'},
                            ]
                           );
            });
  }

  _loadingRender = () => {
      if(this.state.loading === true)
      {
      return(<Spinner/>);
      }
  }

  render(){
    const { navigate } = this.props.navigation;
    return (<View style= {styles.container}>
              {this._loadingRender()}
              <Text style={styles.head}>Вход</Text>
              <View>
                <FormLabel>Логин</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.login} onChangeText={(text) => this.setState({login: text})}/>
                <FormLabel>Пароль</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.pass} onChangeText={(text) => this.setState({pass: text})} secureTextEntry = {true}/>
                <Button title='Войти' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress = { () => {this.login()}}/>
                <TouchableHighlight onPress = { () => {navigate('registerPage')}} underlayColor = {"transparent"}>
                  <Text style= {styles.hrefStyle}>
                    Регистрация
                  </Text>
                </TouchableHighlight>
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
                                  inputStyle:{
                                    width:width-50,
                                    borderColor: '#fff'
                                  },
                                  btnStyle:{
                                    marginTop: 40
                                  },
                                  hrefStyle:{
                                    marginTop: 40,
                                    color: '#03b1f7',
                                    textAlign: 'center'
                                  }
                                  });

export default Login;