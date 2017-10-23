import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import base64 from 'base-64';
import { API_USERNAME, API_PASSWORD, API_URL } from 'react-native-dotenv';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  state = {
    data: []
  }

  constructor() {
    super();

    this.onPressFetchLines = this.onPressFetchLines.bind(this);
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
          onPress={this.onPressFetchLines}
          title="Buscar ônibus da linha 356"
          color="#841584"
        />
        <MapView
        initialRegion={{
          latitude: -23.56,
          longitude: -46.69,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
  line: {
    color: '#fff'
  }
});
