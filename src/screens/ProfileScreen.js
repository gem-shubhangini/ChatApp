import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../appcontext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';




const ProfileScreen = ({navigation}) => {
  const {props, setProps} = useContext(AppContext);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Profile}>
        <View>
          <Ionicons name="person-circle-outline" size={200} color="black" />
        </View>
        <View style={styles.details}>
          <Text style={styles.profileDetail}>{props.calleduser}</Text>
          <Text style={styles.profileDetail}>{props.calledemailId}</Text>
        </View>
      </View>
      <View style={styles.opreation}>
        <TouchableOpacity style={styles.icon} onPress={()=>{
            setProps({...props,status:'connecting'})
          navigation.navigate('Call')
          }}>
          <Ionicons name="call" size={30} color="white"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate('Chat');
          }}>
          <Entypo name="chat" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  details: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Profile: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  opreation: {
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  icon: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetail: {
    fontSize: 15,
    fontWeight: '700',
  },
});
