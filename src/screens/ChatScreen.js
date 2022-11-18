import {Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import AppContext from '../appcontext';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Pusher
} from '@pusher/pusher-websocket-react-native';
import axios from '../api/axios';


const ChatScreen = ({navigation}) => {
    const[messageText,setMessageText]=useState("");

    const scrollRef = useRef()
  const {props, setProps} = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const pusher = Pusher.getInstance();

const ChatPush = ()=>{
    //create pusher connector
    try {
      pusher.init({
        apiKey: "436e4833f50eb1ea41c2",
        cluster: "ap2",
        onEvent,
      });
      pusher.connect();
      pusher.subscribe({
        channelName: 'messages',
      });
    } catch (error) {}
  };

  const onEvent = (event) => {
    console.log(`onEvent: ${event}`);
    console.log("messages",messages);
    setMessages([...messages,JSON.parse(event.data)])
  };

 

  useEffect(() => {
    ChatPush();
    return () => {
      pusher.unsubscribe({channelName: 'messages'});
    };
  }, [messages]);
 
  useEffect(()=>{
    axios.get('/messages/sync')
    .then(response=>{
     console.log(response.data)
     setMessages(response.data)
    })
},[])


  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    
      <View style={styles.chatMessage}>
        <ScrollView  ref={scrollRef} onContentSizeChange={()=>scrollRef.current.scrollToEnd()}>
            {
                messages.map((item,index)=><View  key={index}>
                    <Text>{item.name}</Text>
                    <View style={styles.chatRecievd}>
                    <Text>{item.message}</Text>
                    <Text>{item.timestamp}</Text>
                    </View>
                </View>
                )
            }
        </ScrollView>
      </View>
     
      <View style={styles.chatFormContainer}>
        <Text style={{fontWeight:"700",fontSize:15}}>Send it to {props.calleduser}</Text>

        <View style={styles.chatForm}>
          <TextInput
            placeholder="Tap here to chat"
            style={styles.textInput}
            value={messageText}
            onChangeText={(text)=>setMessageText(text)}
            placeholderTextColor="#595859"
          />

          <TouchableOpacity
            style={{
              ...styles.button,

              backgroundColor: messageText ? '#0b71eb' : '#373838',
            }}
            disabled={messageText?false:true}
            onPress={()=>console.log("message : ",messageText)}
            >
            <FontAwesome name={'send'} size={18} color="#efefef" style={styles.send} />
          </TouchableOpacity>
        </View>
     
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
         flex:1,
       
    
    },
    chatFormContainer:{
     padding:5,
     
    },
    chatForm:{
        flexDirection:"row",  
       
    },
    button:{
        justifyContent:"center",
        alignItems:"center",
        width:50,
        borderRadius:10
    },
    textInput:{
       flex:1,
       backgroundColor:"#d3d3d3",
       marginRight:5,
       borderRadius:10,
       padding:10
    },
    chatMessage:{
      flex:1
    },
    chatRecievd:{
       minWidth:100,
       maxWidth:300,
       height:50,
       marginVertical:5,
       backgroundColor:"#efefef",
       borderRadius:15,
       padding:5
    }
   
});
