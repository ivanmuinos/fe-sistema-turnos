import React from 'react';
import Navigation from './app/navigations/Navigation';
import { View, Text, StyleSheet } from 'react-native';

const normalUser = true;

export default function App() {
    return (
      <Navigation/>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})


