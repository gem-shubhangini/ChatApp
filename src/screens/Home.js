import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AppContext from '../appcontext';
import axios from '../api/axios';

const Home = ({navigation}) => {
  const {props, setProps} = useContext(AppContext);
  const [users,setUsers]=useState([])
    useEffect(()=>{
      axios.get('/user/sync') 
      .then(response=>{
        console.log(response.data)
        setUsers(response.data)
       })
    },[])
     
    const Loginuser =()=>{
      let create =true;
      users.map((item)=>{
          if(item.name===props.user && item.email===props.emailId){
              create=false;
          }
      })
      if(create){
          axios.post('/user/create',{
             name:props.user,
             email:props.emailId
          })
          axios.get('/user/sync') 
          .then(response=>{
            console.log(response.data)
            setUsers(response.data)
           })
      }
      navigation.navigate('Contacts',{
        users:users
      })
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View style={styles.inputContainer}>
            <View style={styles.secondConatainer}>
              <Text>UserName</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={text =>
                  setProps({...props, user: text})
                }></TextInput>
            </View>
            <View style={styles.secondConatainer}>
              <Text>EmailId</Text>
              <TextInput
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={text =>
                  setProps({...props, emailId: text})
                }></TextInput>
            </View>
            <View style={styles.secondConatainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Loginuser()}>
                <Text style={{color: 'white', fontSize: 15}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    padding: 50,
  },
  secondConatainer: {
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    height: 300,
    borderRadius: 10,
    padding: 20,
  },
  textInput: {
    height: 40,
    backgroundColor: '#efefef',
    color: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
