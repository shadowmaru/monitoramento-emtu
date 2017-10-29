import React from 'react';
import { TouchableOpacity, View, FlatList, Text, Button, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Linhas'
  }

  state = {
    lines: [
      {
        id: '078',
        name: 'Pq. Pirajussara - Pinheiros'
      },
      {
        id: '356',
        name: 'Pq. Pinheiros (C.S.U) - Pinheiros'
      },
      {
        id: '032',
        name: 'Itapecirica - Pinheiros'
      },
      {
        id: '412',
        name: 'Embu das Artes - Rod. Tietê'
      }
    ]
  }

  constructor() {
    super();

    this._onPressLine = this._onPressLine.bind(this);
  }

  _onPressLine = (item) => {
    this.props.navigation.navigate('Line', {line: item.id})
  }

  _renderItem = ({item}) => {
    return  (
      <TouchableOpacity onPress={()=>this._onPressLine(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
          <Text style={{marginLeft: 10}}>{item.id} - {item.name}</Text>
      </TouchableOpacity>
    )
  }

  renderLine = ({item}) => {
    return(
      <Text style={styles.line}>{item.prefixo} - {item.latitude}, {item.longitude}</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Monitoramento EMTU</Text>
        <FlatList
          data={this.state.lines}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={()=>
              <View style={{height:1, backgroundColor: '#f7f7f7'}}
          />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'navy',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    color: '#fff'
  }
});