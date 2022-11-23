import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppContext from '../appcontext';
const Videocall = ({navigation}) => {
    const [audio,setAudio]=useState(true);
    const [video,setVideo]=useState(true);
    const {props, setProps} = useContext(AppContext);


  return (
   <SafeAreaView style={styles.container}>
         <View style={styles.container}>
            <View style={{...styles.callscreen,justifyContent:props.status==='connecting'?"center":""}}>
               {props.status==="connecting" && <View style={styles.text}>
                   <Text style={{color:"white",fontSize:18}}>Connecting...</Text>
                </View>}
            </View>
            <View style={styles.bottomMenu}>
              <TouchableOpacity style={{...styles.button,backgroundColor:"red"}} onPress={()=>navigation.navigate("Incoming Call")}>
              <MaterialCommunityIcons name='phone-hangup' size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>setAudio(!audio)}>
              <MaterialCommunityIcons name={audio?'microphone':'microphone-off'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>setVideo(!video)}>
              <MaterialCommunityIcons name={video?'video':'video-off'} size={30} />
              </TouchableOpacity>
            </View>
         </View>
   </SafeAreaView>
  )
}

export default Videocall

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        flex:1
    },
    callscreen:{
        flex:1,
    },
    bottomMenu:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
         borderTopColor:"#d3d3d3",
         borderTopWidth:0.5,
         padding:10
    },
    button:{
        width:60,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#efefef",
        borderRadius:30
    },
    text:{
        
        alignItems:"center",
        display:"flex"
    }
})