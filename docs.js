import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableHighlight, AsyncStorage, Alert } from 'react-native'
import { FormLabel, FormInput, Button, List, ListItem, Icon  } from 'react-native-elements'
const {width, height} = Dimensions.get('window');
import ajax from './components/ajax';
import Spinner from './components/spinner';

class Docs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      docs: []
    };
  }
  static navigationOptions = {
      title: 'Мои документы',
  };

  _open_doc = (v1,v2,v3) => {
    const { navigate } = this.props.navigation;
    navigate('viewPage', {name: v1, src: v2, id_doc: v3})
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
                          chevron: false,
                          src: data[i].src,
                          id_doc: data[i].id_doc,
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
                        key={i}
                        title={l.name}
                        hideChevron={l.chevron}
                        onPress={()=>{this._open_doc(l.name, l.src, l.id_doc)}}
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

export default Docs;