import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableHighlight, AsyncStorage, Alert } from 'react-native'
import { FormLabel, FormInput, Button, List, ListItem, Icon  } from 'react-native-elements'
const {width, height} = Dimensions.get('window');
import ajax from './components/ajax';
import Spinner from './components/spinner';
import Share from 'react-native-share';

class ShareDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      docs: []
    };
  }
  static navigationOptions = {
      title: 'Поделиться',
  };

  _share_doc = (v1,v2) => {
    let shareOptions = {
      title: "Мой документ",
      message: "Ссылка для просмотра документа "+v1,
      url: "http://syysbiir.000webhostapp.com/docs/"+v2,
      subject: "Share Link"
    };
    Share.open(shareOptions);
  }

  componentDidMount() {
          this.setState({
              loading: true
          });
          AsyncStorage.getItem("login").then((login) => {
            AsyncStorage.getItem("pass").then((pass) => {
              ajax('POST','event=get_list'+
                  '&login='+login+
                  '&pass='+pass)
                  .then((data) => {
                    this.setState({
                      loading: false
                    });
                    if(data.status === "none")
                    {
                      this.state.docs.push({
                          name: "У вас нет документов",
                          chevron: true,
                          src: null
                        });
                      this.setState({
                          docs: this.state.docs
                      });
                    }else if (data.status === "error")
                    {
                      Alert.alert(
                          'Ошибка',
                          'Не удалось получить список документов',
                          [
                           {text: 'OK'},
                           ]
                          );
                    } else {
                      for (i=0; i<data.length; i++) {
                        this.state.docs.push({
                          name: data[i].name, 
                          icon: 'photo',
                          icon2: 'share',
                          chevron: false,
                          src: data[i].src
                        });
                        this.setState({
                          docs: this.state.docs
                        });
                      }
                    }
                  })
                  .catch((error) => {
                    this.setState({
                      loading: false
                    });
                      Alert.alert(
                          'Ошибка',
                          'Неизвестная ошибка',
                          [
                           {text: 'OK'},
                           ]
                      );
                  });   
            }).done();
          }).done(); 
  }

  _loadingRender = () => {
      if(this.state.loading === true)
      {
      return(<Spinner/>);
      }
  }

  render(){
    return (<View style= {styles.container}>
                {this._loadingRender()}
                <List containerStyle={{marginBottom: 20, marginTop: 0}}>
                  {
                    this.state.docs.map((l, i) => (
                      <ListItem
                        leftIcon={{name:l.icon}}
                        rightIcon={{name:l.icon2}}
                        key={i}
                        title={l.name}
                        hideChevron={l.chevron}
                        onPress={()=>{this._share_doc(l.name, l.src)}}
                      />
                    ))
                  }
                </List>
            </View>);
  }
}

var styles = StyleSheet.create({
                                  container: {
                                    flex: 1,
                                    
                                    backgroundColor:'white'
                                  },
                                  head:{
                                    fontSize: 25,
                                    marginBottom: 40,
                                  },
                                  inputStyle: {
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

export default ShareDoc;