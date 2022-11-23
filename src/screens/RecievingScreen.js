import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const RecievingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{...styles.container,justifyContent:"center",alignItems:"center"}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"white",fontSize:30}}>Name</Text>
          <Text style={{color:"white",fontSize:18}}>calling...</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'green'}}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="phone" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'red'}}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="phone-hangup" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecievingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    borderRadius: 30,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: '#d3d3d3',
    borderTopWidth: 0.5,
    padding: 10,
  },
});
