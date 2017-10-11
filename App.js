import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import base64 from 'base-64';
import { API_USERNAME, API_PASSWORD } from 'react-native-dotenv'

export default class App extends React.Component {
  constructor() {
    super();

    this.onPressFetchLines = this.onPressFetchLines.bind(this);
  }

  onPressFetchLines() {
    const username = API_USERNAME
    const password = API_PASSWORD
    const authToken = base64.encode(`${username}:${password}`)
    const url = 'https://emtu.noxxonsat.com.br/rest/usuarios/v2?linha=356'
    console.log(authToken)

    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Basic ${authToken}`
      },
      mode: 'cors'
    }
    const request = new Request(url, options)

    console.log(request);

    fetch(request).
      then(response => response.json()).
      then(jsondata => console.log(jsondata)).
      catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Monitoramento EMTU</Text>
        <Button
          onPress={this.onPressFetchLines}
          title="Buscar Linhas"
          color="#841584"
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
});
