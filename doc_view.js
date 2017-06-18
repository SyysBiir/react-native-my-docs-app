import React from 'react';
import {
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  View,
  Alert,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements'

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import ajax from './components/ajax';
import RNRestart from 'react-native-restart';
var id_doc;
//const pdfDownloadURL = "http://192.168.43.135/api_docs/docs/"+params.src;

export default class PDFExample extends React.Component {
  state = {
    isPdfDownload: false
  };

  static navigationOptions = {
      headerRight: 
        <View style={{marginRight:10}}>
          <Icon 
            onPress = {() => {
                Alert.alert(
                'Подтверждение',
                'Вы действительно хотите удалить этот документ?',
                [
                  {text: 'Нет', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'Да', onPress: () => {
                            AsyncStorage.getItem("login").then((login) => {
                                        AsyncStorage.getItem("pass").then((pass) => {
                                          ajax('POST','event=remove'+
                                              '&login='+login+
                                              '&pass='+pass+
                                              '&doc='+id_doc)
                                              .then((data) => {
                                              if(data.status === 'success')
                                              {
                                              Alert.alert(
                                                       'Мои документы',
                                                       'Документ успешно удален',
                                                       [
                                                        {text: 'OK'},
                                                        ]
                                                       );
                                              setTimeout(()=>{RNRestart.Restart()},2000);
                                              } else {
                                              Alert.alert(
                                                       'Ошибка',
                                                       'Не удалось удалить документ',
                                                       [
                                                        {text: 'OK'},
                                                        ]
                                                       );
                                              setTimeout(()=>{RNRestart.Restart()},2000);
                                              }
                                              })
                                              .catch((error) => {
                                              Alert.alert(
                                                       'Ошибка',
                                                       'Не удалось соединиться с сервером',
                                                       [
                                                        {text: 'OK'},
                                                        ]
                                                       );
                                              setTimeout(()=>{RNRestart.Restart()},2000);
                                              });   
                                        }).done();
                                      }).done(); 
                  }},
                ],
                { cancelable: false }
                )
            }}
            name='delete-forever'
            color='red' />
        </View>
      ,
  };

  constructor(props) {
    super(props);
    this.pdfView = null;
    this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    id_doc = params.id_doc;
    const options = {
      fromUrl: "http://localhost/docs/"+params.src,
      toFile: this.pdfPath
    };
    RNFS.downloadFile(options).promise.then(res => {
      this.setState({isPdfDownload: true});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    if (!this.state.isPdfDownload) {
      return (
        <View style={styles.container}>
          <Text>Загрузка</Text>
        </View>
      );
    }
    return (
      <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
               key="sop"
               path={this.pdfPath}
               onLoadComplete={(pageCount)=>{
                        console.log(`total page count: ${pageCount}`);
                     }}
               style={styles.pdf}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pdf: {
    flex: 1
  }
});