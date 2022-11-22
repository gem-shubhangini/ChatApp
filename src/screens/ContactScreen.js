import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AppContext from '../appcontext';

const ContactScreen = ({navigation,route}) => {
  const {props, setProps} = useContext(AppContext);

  const {users}=route.params;
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = text => {
    if (!text) {
      setSearchResults([]);

      return;
    }
    setSearchResults(users.filter(query => query.name.includes(text) && query.name!=props.user &&query.email!=props.emailId  ));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          onChangeText={text => handleSearch(text)}
          placeholder="Search for contacts"
          placeholderTextColor={darkTheme ? 'white' : 'grey'}
          style={styles.textinput}
        />
        <View style={styles.searchResults}>
          {searchResults.slice(0, 10).map((n, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={styles.searchtext}
              onPress={() => {
                setProps({
                  ...props,
                  calleduser: n.name,
                  calledemailId: n.email,
                });
                navigation.navigate('Profile');
                setSearchResults([]);
              }}>
              <Text
                style={{
                  ...styles.singleResult,

                  color: 'white',
                }}>
                {n.name}
              </Text>
              <Text
                style={{
                  ...styles.description,

                  color: 'white',
                }}>
                {n.email}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <Text>Recents</Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  searchtext: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    width: 380,

    paddingVertical: 5,
  },
  searchResults: {
    position: 'absolute',
    zIndex: 1,
    top: 55,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'grey',
    paddingHorizontal: 5,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 5,
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  singleResult: {
    fontSize: 18,
  },
  description: {},
});
