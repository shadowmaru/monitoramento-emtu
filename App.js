import React from 'react';
import { StatusBar, Platform } from 'react-native';
import Home from './src/screens/Home';
import Line from './src/screens/Line';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Home: {
    screen: Home
  },
  Line: {
    screen: Line
  },
},
{
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

export default App;
