import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Dimensions, Text, TouchableHighlight, Alert, AsyncStorage, Keyboard } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
const {width, height} = Dimensions.get('window');
import ajax from './components/ajax';
import Spinner from './components/spinner';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: '',
      pass: '',
      pass2: '',
      loading: false
    };
  }
  static navigationOptions = {
      header: null,
  };

  addlogin = (value, value2) => {
      AsyncStorage.setItem('login', value);
      AsyncStorage.setItem('pass', value2);
      Keyboard.dismiss();
  }

  register = () =>{
          const { navigate } = this.props.navigation;
            this.setState({
                loading: true
            });
          ajax('POST', 'event=register'+
              '&name='+this.state.name+
              '&login='+this.state.login+
              '&pass='+this.state.pass+
              '&pass2='+this.state.pass2).then((data)=>{
              this.setState({
                loading: false
              });
              if(data.status === 'success')
              {
              navigate('homePage');
              this.addlogin(this.state.login, this.state.pass);
              } else if(data.status === 'error 0'){
              Alert.alert(
                          'Ошибка',
                          'Заполните все поля',
                          [
                           {text: 'OK'},
                           ]
                          );
              } else if(data.status === 'error 1'){
              Alert.alert(
                          'Ошибка',
                          'Пользователь с таким логином уже зарегистрирован',
                          [
                           {text: 'OK'},
                           ]
                          );
              } else if(data.status === 'error 2'){
              Alert.alert(
                          'Ошибка',
                          'Пароли не совпадают',
                          [
                           {text: 'OK'},
                           ]
                          );               
              } else
              {
              Alert.alert(
                          'Ошибка',
                          'Неизвестная ошибка, повторите еще раз',
                          [
                           {text: 'OK'},
                           ]
                          );                   
              }
            }).catch((error) => {
              Alert.alert(
                           'Ошибка',
                           'Не удалось соединиться с сервером. Текст ошибки:' + error,
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
    return (<ScrollView style={styles.contScroll}>
            {this._loadingRender()}
            <View style= {styles.container}>
              <Text style={styles.head}>Регистрация</Text>
              <View>
                <FormLabel>ФИО</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.name} onChangeText={(text) => this.setState({name: text})}/>
                <FormLabel>Логин</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.login} onChangeText={(text) => this.setState({login: text})}/>
                <FormLabel>Пароль</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.pass} onChangeText={(text) => this.setState({pass: text})}/>
                <FormLabel>Повторите пароль</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} value={this.state.pass2} onChangeText={(text) => this.setState({pass2: text})}/>
                <Button title='Зарегистрироваться' buttonStyle={styles.btnStyle} backgroundColor={'#F89406'} onPress ={ ()=>{this.register()}}/>
                <TouchableHighlight onPress = { () => navigate('loginPage')} underlayColor = {"transparent"}>
                  <Text style= {styles.hrefStyle}>
                    Вход
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            </ScrollView>);
  }
}

var styles = StyleSheet.create({
                                  contScroll:{
                                    flex: 1,
                                    height: height,
                                    backgroundColor:'white'
                                  },
                                  container:{
                                    flex: 1,
                                    flexDirection:'column',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:'white',
                                    paddingTop: 20,
                                    paddingBottom: 20
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

export default Register;