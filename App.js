/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AppContext, {initialState} from './src/appcontext';
import ChatScreen from './src/screens/ChatScreen';

import ContactScreen from './src/screens/ContactScreen';
import Home from './src/screens/Home';
import ProfileScreen from './src/screens/ProfileScreen';
import RecievingScreen from './src/screens/RecievingScreen';
import Videocall from './src/screens/Videocall';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createStackNavigator();

const App = () => {
  const [props, setProps] = useState(initialState);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AppContext.Provider value={{props, setProps}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Contacts" component={ContactScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Chat" component={ChatScreen}/>
          <Stack.Screen name="Call" component={Videocall}/>
          <Stack.Screen name="Incoming Call" component={RecievingScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
