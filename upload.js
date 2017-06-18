import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableHighlight, Alert, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'
const {width, height} = Dimensions.get('window');

const FilePickerManager = require('NativeModules').FilePickerManager;
import FileUploader from 'react-native-file-uploader';
import Spinner from './components/spinner';
import CustomModal from './components/custom_modal';

class UploadDoc extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      loading: false,
      modal: false,
      file_name: ""
    };
  }
  static navigationOptions = {
      title: 'Загрузка документа',
  };

  _picker(){
  FilePickerManager.showFilePicker(null, (response) => {

  if (response.didCancel) {
  }
  else if (response.error) {
  }
  else {
      this.setState({
          file: response,
          modal: true
      });
  }
  });
  }

  _loadingRender = () => {
      if(this.state.loading === true)
      {
      return(<Spinner/>);
      }
  }

  updateNameFile = (text) => {
      this.setState({file_name: text})
  }

  _modal = () => {
      const { navigate } = this.props.navigation;
      if(this.state.modal === true)
      {
      return(<CustomModal action={()=>{
      AsyncStorage.getItem("login").then((login) => {
          AsyncStorage.getItem("login").then((Pass) => {
              this.setState({
                        loading: true
                    });
              const settings = {
                uri: this.state.file.path,
                uploadUrl: 'http://syysbiir.000webhostapp.com/upload.php',
                method: 'POST',
                fileName: 'file',
                fieldName: 'file',
                contentType: 'pdf',
                data: {
                  f_name: this.state.file_name,
                  login: login,
                  pass: Pass
                }
              };
              FileUploader.upload(settings, (err, result) => {
                if(result!= null){
                      Alert.alert(
                                  'Мои документы',
                                  result.data,
                                  [
                                   {text: 'OK'},
                                   ]
                                  );

                    this.setState({
                        loading: false,
                        modal: false
                    });
                    navigate('homePage');
                }
              }, (sent, expectedToSend) => {
              });
          }).done();
      }).done();
      }


    }
      updateNameFile = {this.updateNameFile} />);
      }
  }

  render(){
    return (<View style= {styles.container}>
              {this._loadingRender()}
              {this._modal()}
              <Text style={styles.head} >Выберите документ</Text>
              <Icon
                name='file-upload'
                color='#c1c1c1' 
                size={100}
                onPress={()=>{this._picker() }}/>
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

export default UploadDoc;