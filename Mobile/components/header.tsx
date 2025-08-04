// Create a react native header component with a hamburger menu on the left and a search bar in the middle
// // the hamburger menu should open a drawer navigation



import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

export function Header() {
 return (
   <View style={styles.header}>
     <Pressable onPress={() => console.log("Huh?")} style={styles.hamburger}>
       <Ionicons name="menu" size={24} color="black" />
     </Pressable >
     <TextInput
     style={styles.searchBar}
     placeholder="Search..."
     placeholderTextColor="#888"
     onChangeText={(text) => console.log(text)}
     value={''}
     />
   </View>
 );
} 

const styles = StyleSheet.create({
   header: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: 10,
   backgroundColor: '#fff',
   borderBottomWidth: 1,
   borderBottomColor: '#ccc',
   },
   hamburger: {
   padding: 10,
   },
   searchBar: {
   flex: 1,
   height: 40,
   borderWidth: 1,
   borderColor: '#ccc',
   borderRadius: 5,
   paddingHorizontal: 10,
   backgroundColor: '#f9f9f9',
   color: '#333',
   fontSize: 16,
   },
 });

