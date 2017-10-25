import React from 'react';
import { TouchableOpacity, View, FlatList, Text, Button, StyleSheet } from 'react-native';

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
  line: {
    color: '#fff'
  }
});