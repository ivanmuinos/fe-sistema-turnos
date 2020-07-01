import React, {useState, useEffect} from 'react';
import AppContainer from './app/index';
import { View, Text, StyleSheet } from 'react-native';
import { firebaseApp } from './app/utils/Firebase';
import Login from './app/screens/Account/Login';

console.disableYellowBox = true;

export default function App() {

    return <AppContainer />
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})


