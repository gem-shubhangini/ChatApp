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

const ContactScreen = ({navigation}) => {
  const {props, setProps} = useContext(AppContext);
  const articles = [
    {
      user: 'Riya',
      emailId: 'Riya@gmail.com',
    },
    {
      user: 'Riya',
      emailId: 'Riya1@gmail.com',
    },
    {
      user: 'Tanish',
      emailId: 'Tanish@gmail.com',
    },
    {
      user: 'abcd',
      emailId: 'abcd@gmail.com',
    },
  ];
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = text => {
    if (!text) {
      setSearchResults([]);

      return;
    }
    setSearchResults(articles.filter(query => query.user.includes(text)));
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
                  calleduser: n.user,
                  calledemailId: n.emailId,
                });
                navigation.navigate('Profile');
                setSearchResults([]);
              }}>
              <Text
                style={{
                  ...styles.singleResult,

                  color: 'white',
                }}>
                {n.user}
              </Text>
              <Text
                style={{
                  ...styles.description,

                  color: 'white',
                }}>
                {n.emailId}
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
