import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
const {width, height} = Dimensions.get('window');

class CustomModal extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (<View style= {styles.container}>
			<View>
                <FormLabel>Введите название вашего документа</FormLabel>
                <FormInput inputStyle={styles.inputStyle} underlineColorAndroid={'#9e9e9e'} onChangeText={this.props.updateNameFile}/>
                <Button title='Загрузить' buttonStyle={styles.btnStyle} backgroundColor={'#87D37C'} onPress = { () => {this.props.action()}}/>
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
                                    backgroundColor:'white',
                                   position:'absolute', 
                                   zIndex:9999,
                                   top: 0,
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  },
                                  inputStyle:{
                                    width:width-50,
                                    borderColor: '#fff'
                                  },
                                  btnStyle:{
                                    marginTop: 40
                                  },
                                   });

export default CustomModal;