import React from 'react';
import { MapView } from 'expo';
import base64 from 'base-64';
import { API_USERNAME, API_PASSWORD, API_URL } from 'react-native-dotenv';

export default class Line extends React.Component {
  state = {
    markers: []
  }

  static navigationOptions = {
    title: '356'
  }

  componentDidMount() {
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
        this.setState({markers: jsondata.linhas[0].veiculos});
      }).
      then(() => console.log(this.state)).
      catch(error => console.log(error));
  }

  render () {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.586862564086914,
          longitude: -46.73199462890625,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.prefixo}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.prefixo}
          />
        ))}
      </MapView>
    );
  }
}
