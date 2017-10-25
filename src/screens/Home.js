import React from 'react';
import { TouchableOpacity, View, FlatList, Text, Button, StyleSheet } from 'react-native';
import base64 from 'base-64';
import { API_USERNAME, API_PASSWORD, API_URL } from 'react-native-dotenv';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Linhas'
  }

  state = {
      data: []
  }

  constructor() {
    super();

    this.onPressFetchLines = this.onPressFetchLines.bind(this);
    this.onPressLoadLine = this.onPressLoadLine.bind(this);
  }

  onPressLoadLine() {
    this.props.navigation.navigate('Line', {line: 356})
  }

  onPressFetchLines() {
    const username = API_USERNAME
    const password = API_PASSWORD
    const authToken = base64.encode(`${username}:${password}`)
    const url = `${API_URL}?linha=356`

    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    }
    const request = new Request(url, options)

    fetch(request).
      then(response => response.json()).
      // then(jsondata => console.log(jsondata)).
      then(jsondata => {
        this.setState({data: jsondata.linhas[0].veiculos});
      }).
      catch(error => console.log(error));
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
        <Button
          onPress={this.onPressLoadLine}
          title="Buscar ônibus da linha 356"
          color="#841584"
        />
        <FlatList
          data={this.state.data}
          renderItem={this.renderLine}
          keyExtractor={(item) => item.prefixo}
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
  map: {
    // flex: 1
  },
  line: {
    color: '#fff'
  }
});