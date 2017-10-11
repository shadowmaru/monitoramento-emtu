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
    console.log(authToken)

    fetch(
      'https://noxxonsat-nxnet.appspot.com/rest/usuarios/v2?linha=356', {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      console.log(response);
    });
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
